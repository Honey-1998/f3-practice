const API_KEY = "AIzaSyC-o1G1xoIdWvDZPvb97W1JruQ3fojN55g";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

//modified 
async function fetchData(searchQuery, maxItems) {
  try {
    // Showing loader before fetching data
    showLoader(); 
    let response = await fetch(`${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&maxResults=${maxItems}&part=snippet`);
    let data = await response.json();
    let arr = data.items;
    await delay(5000)
    displayCards(arr, scrollableRightSections);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    // Hide loader after fetching data
    hideLoader(); 
  }
}
// newly added
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
}

function hideLoader() {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
}


window.addEventListener('load',() => {
    fetchData("" ,12);
})

searchDiv.addEventListener("click", () => {
  let Value = searchInput.value;
  fetchData(Value, 12);
  searchInput.value = "";
});

async function getVideoInfo(videoId) {
  let response = await fetch(`${BASE_URL}/videos?key=${API_KEY}&part=statistics&id=${videoId}`);
  // let response = await fetch("./videoInfoDummy.json");
  let data = await response.json();
  return data.items;
  // let videoInfo = data.items;
  // console.log(videoInfo);
}

// getVideoInfo('JhIBqykjzbs');

async function getChannelLogo(channelId) {
  const response = await fetch(`${BASE_URL}/channels?key=${API_KEY}&part=snippet&id=${channelId}`);
  // let response = await fetch("./channelLogodummy.json");
  const data = await response.json();

  return data.items;
}
// getChannelLogo('UCt2JXOLNxqry7B_4rRZME3Q');

// get no of subscribers

async function getSubscription(channelid) {
  // console.log(channelid);

  let response = await fetch(`${BASE_URL}/channels?key=${API_KEY}&id=${channelid}&part=statistics`);

  // let response = await fetch("./subscribers.json");

  let data = await response.json();
  return data.items;
}

async function displayCards(data,displayBody) {

  console.log("kriika");
  displayBody.innerHTML = "";
  for (const ele of data) {
    //  console.log(ele);

    let viewCountObj = await getVideoInfo(ele.id.videoId);
    //    console.log(viewCountObj);
    ele.viewObject = viewCountObj; // enjected array as object in ele object

    let channelInfoObject = await getChannelLogo(ele.snippet.channelId);
    //    console.log(channelInfoObject);
    ele.channelObject = channelInfoObject;

    let subscribers = await getSubscription(ele.snippet.channelId);

    ele.subscriberCount = subscribers;

    //    console.log(ele.subscriberCount[0].statistics.subscriberCount);

    let displayDuration = calDuration(ele.snippet.publishedAt);

    let videoCard = document.createElement("a");

    videoCard.className = "videoCard";
    videoCard.href = `./selectedVideo.html?videoId=${ele.id.videoId}`;
    // console.log(ele.id.videoId);

    // creating session storage
    videoCard.addEventListener("click", () => {
      const InfoSelectedVideo = {
        videoTitle: `${ele.snippet.title}`,
        channelLogo: `${ele.channelObject[0].snippet.thumbnails.high.url}`,
        channelName: `${ele.snippet.channelTitle}`,
        likeCount: `${ele.viewObject[0].statistics.viewCount}`,
        channelID: `${ele.snippet.channelId}`,
        subscribers: `${ele.subscriberCount[0].statistics.subscriberCount}`,
      };
      sessionStorage.setItem(
        "selectedVideoInformation",
        JSON.stringify(InfoSelectedVideo)
      );
    });

    videoCard.innerHTML = `<img src="${ele.snippet.thumbnails.high.url}">
        <div class="channel">
            <img src="${ele.channelObject[0].snippet.thumbnails.high.url}" >
            <h4>${ele.snippet.title}</h4>
        </div>
        <div class="channelInfo">
            <p>${ele.snippet.channelTitle}</p>
            <p> ${calculateViews(
              ele.viewObject[0].statistics.viewCount
            )} views , ${displayDuration} ago </p>
        </div>`;

        displayBody.appendChild(videoCard);
  }
}

// cal duration

function calDuration(publisedDate) {
  let displayTime;
  let publisedAt = new Date(publisedDate);
  let MiliSecFromPublised = publisedAt.getTime();

  let currentTime = new Date();

  let currentTimeInMiliSec = currentTime.getTime();

  let duration = currentTimeInMiliSec - MiliSecFromPublised;

  let days = parseInt(duration / 86400000);

  if (days < 1) {
    let hours = parseInt(duration / 3600000);
    displayTime = hours + " " + "hours";
  } else if (days > 6 && days <= 29) {
    let weeks = parseInt(days / 7);
    displayTime = weeks + " " + "weeks";
  } else if (days > 29 && days <= 364) {
    let months = parseInt(days / 30);
    displayTime = months + " " + "months";
  } else if (days > 364) {
    let years = parseInt(days / 365);
    displayTime = years + " " + "years";
  } else {
    displayTime = days + " " + "days";
  }

  return displayTime;
}

// cal views

function calculateViews(viewCount) {
  let displayViews;
  let count;
  if (viewCount < 1000) {
    displayViews = viewCount;
  } else if (viewCount >= 1000 && viewCount <= 999999) {
    displayViews = (viewCount / 1000).toFixed(1) + " " + "K";
  } else if (viewCount >= 1000000) {
    displayViews = (viewCount / 1000000).toFixed(1) + " " + "M";
  }

  return displayViews;
}
// toggle in menues

let menuButton = document.getElementById("menubar");
console.log(menuButton);

menuButton.addEventListener('click', showSmallMenuOptions);
// 

function showSmallMenuOptions (){

  let menuCards = document.getElementsByClassName("mo");


  // console.log(menuCards);

  for(let menu of menuCards){
    if(menu.classList.contains("menuCards")){
      menu.classList.remove("menuCards");
      menu.classList.add("MENUCARDS");
      leftSection.style.flex=1.5;
      copyRightSystem.style.display="block";
    }
    else{
      

      menu.classList.remove("MENUCARDS");
      menu.classList.add("menuCards");
      leftSection.style.flex=.5;
      copyRightSystem.style.display="none";
      
    }
  }
}


// Get the theme toggle button
const themeToggleBtn = document.getElementById('themeToggleBtn');

// Listen for click events on the theme toggle button
themeToggleBtn.addEventListener('click', toggleTheme);

// Function to toggle between light and dark themes
function toggleTheme() {
    // Get the body element
    const body = document.body;

    // Toggle the 'dark-mode' class on the body
    body.classList.toggle('dark-mode');

    // Check if the dark mode is enabled after toggling
    const isDarkMode = body.classList.contains('dark-mode');

    // Save the current theme preference in local storage
    localStorage.setItem('darkMode', isDarkMode);
}

// Check the user's preference from local storage on page load
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Set the initial theme based on the user's preference
document.body.classList.toggle('dark-mode', isDarkMode);

