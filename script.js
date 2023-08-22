const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const get = (param) => document.getElementById(`${param}`);
const url = "https://api.github.com/users/";
const noresults = get("no-results");
const btnmode = get("btn-mode");
const modetext = get("mode-text");
const modeicon = get("mode-icon");
const btnsubmit = get("submit");
const input = get("input");
const avatar = get("avatar");
const userName = get("name");
const user = get("user");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
let darkMode = false;

// Event Listeners
btnsubmit.addEventListener("click",function(){
    if(input.value !==""){
        getUserData(url+input.value);
    }
});
input.addEventListener(
    "keydown",
    function(e){
        if(e.key=="Enter"){
            if(input.value!==""){
                getUserData(url+input.value);
            }
        }
    },
    false
);
input.addEventListener("input",()=>{
    noresults.style.display="none";
});
btnmode.addEventListener("click", function () {
    if (darkMode == false) {
      darkModeProperties();
    } else {
      lightModeProperties();
    }
  });

//   Functions
// API call
function getUserData(gitUrl){
    fetch(gitUrl)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        updateProfile(data);
    })
    .catch((error)=>{
        throw error;
    });
}

// Render
function updateProfile(data){
    if(data.message!=="Not Found"){
        noresults.style.display="none";
        function checkNull(param1,param2){
            if(param1==="" || param2===null){
                param2.style.opacity=0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return false;
            }
            else{
                return true;
            }

        }
        avatar.src=`${data.avatar_url}`;
        userName.innerText=data.name==null ? data.login:data.name;
        // If data.name is null (or undefined), then the expression after the ? is evaluated, and data.login is 
        // used as the value to set the innerText of the userName element.
        // If data.name is not null, then the expression after the : is evaluated, and data.name is 
        // used as the value to set the innerText of the userName element.
        user.innerText = `@${data.login}`;
        user.href=`${data.html_url}`;
        datesegments = data.created_at.split("T").shift().split("-");
        // The split("T") operation splits the string at the "T" character, resulting in two parts: "2023-08-22" (date) and 
        // "14:30:00Z" (time).
        // The shift() operation removes and returns the first element of the array, which is "2023-08-22".
       // The split("-") operation splits the date segment into three parts: "2023", "08", and "22".
       // The datesegments array now contains the year, month, and day components of the creation date.
       date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
       bio.innerText=data.bio==null ? "This Profile Has No Bio" : `${data.bio}`;
       repos.innerText=`${data.repos_url}`;
       followers.innerText=`${data.followers}`;
       following.innerText=`${data.following}`;
       user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    //    data.location: This presumably refers to a property named "location" in the data object. This property might
    //  contain information about the user's location.
    //    user_location: This seems to be a variable or reference representing a default location value. 
    // It's being used as the fallback value if data.location is null.
       page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
       page.href = checkNull(data.blog, page) ? data.blog : "#";
       twitter.innerText=checkNull(data.twitter_username,twitter) ? data.twitter_userName : "Not Available";
       twitter.href=checkNull(data.twitter_username,twitter) ? `https://twitter.com/${data.twitter_userName}`:"#";
       company.innerText=checkNull(data.company,company) ? data.company : "Not Available";
       searchbar.classList.toggle("active");
       profilecontainer.classList.toggle("active");

    }
    else{
        noresults.style.display="block";
    }
}


