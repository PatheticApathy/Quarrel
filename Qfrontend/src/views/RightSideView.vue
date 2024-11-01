<script setup lang="ts">
import { ref } from 'vue'

/* const users = ref<Array<User>> 
(
    [
        {
            UID: 123456789,
            Username: "alice123",
            Password: "password1",
            Follow_count: 10,
            Bio: "Alice Person",
            Profile_pic: ""
        },
        {
            UID: 987654321,
            Username: "bowman",
            Password: "password2",
            Follow_count: 10,
            Bio: "Thomas Bowman",
            Profile_pic: "../src/assets/profile-pic.jpg"
        }
    ]
) */

let users = ref<Array<User>>([]);
get_user();

const home_error_message = ref<String>('');

async function get_user() {
  console.log('Fetching users');
  try {
    const resp = await fetch('http://localhost:8081/user/find/1',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (!resp.ok) {
      const error: Api_Error = await resp.json();
      console.error(`Response status: ${resp.status} with errror ${error.error}`);
      home_error_message.value = error.error;
    } else {
      let text = await resp.text();
      users.value = JSON.parse(text);
      console.log("Succesfully fetched");
    }
  }
  catch (err) {
    console.error(`Error parsing json: ${err}`)
  }
}

async function get_args() {
  //TODO:
  console.log(10);
}

</script>

<template>
    <div class="full">

        <div class="searchDiv">
            <input class="search" placeholder="Search" type="text">
        </div>

        <div class="trendingSuggestions">What's Happening
            <div class="trending">
                <div>Trending
                    <div class="trendingObject">Sportsball</div>
                </div>
                <div>Trending
                    <div class="trendingObject">Movies</div>
                </div>
                <div>Trending
                    <div class="trendingObject">Books</div>
                </div>
                <div>Trending
                    <div class="trendingObject">Video Games</div>
                </div>
                <div>Trending
                    <div class="trendingObject">Comics</div>
                </div>
            </div>
        </div>

        <div class="followSuggestions">Who to Follow
            <div class="follow">
                <div v-for="u in users.slice(0, Math.min(3, users.length))" class="followObject">
                    <span v-if="!u.Profile_pic">
                        <img class="userImg" src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg">
                    </span>
                    <span v-else>
                        <img class="userImg" v-bind:src=u.Profile_pic>
                    </span>
                    <span>{{ '\u00A0\u00A0' + u.Username }}</span>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style>

.full {
    height: 200%;
    width: 32.552083333333333333333333333333%;
    position: absolute;
    left: 65.625%;
    top: 0%;
    border-left: 1px solid var(--color-border);
}

.searchDiv {
    position: relative;
    left: 6.666666666666666666666666666667%;
    top: 0.82901554404145077720207253886%;
    border-radius: 50px;
    border: 2px solid var(--color-border);
    background-color: mediumpurple;
    border-color: mediumpurple;
    width: 70%;
    height: 2.668089647812166488794023479189%;
}

.searchDiv:focus-within {
    border-color: violet;
}

.search {
    position: relative;
    top: 12.5%;
    left: 8.571428571428571428571428571429%;
    background-color: mediumpurple;
    width: 80%;
    height: 50%;
    border: none;
}

.search:focus {
    border: none;
    background-color: mediumpurple;
    outline: none;
}

.trendingSuggestions {
    position: relative;
    left: 6.666666666666666666666666666667%;
    top: 2.48704663212435233160621761658%;
    border-radius: 15px;
    border: 2px solid var(--color-border);
    padding-top: 3.012048192771084337349397590361%;
    padding-left: 4.285714285714285714285714285714%;
    width: 70%;
    height: 36.686232657417289220917822838847%;
    font-size: 25px;
    padding-bottom: 3.012048192771084337349397590361%;
}

.trendingObject {
    padding-bottom: 9.05454545454545454545454545454545%;
}

.trending {
    padding-top: 9.036144578313253012048192771084%;
    font-size: 18px;
}

.followSuggestions {
    position: relative;
    left: 6.666666666666666666666666666667%;
    top: 4.145077720207253886010362694301%;
    border-radius: 15px;
    border: 2px solid var(--color-border);
    padding-top: 2.857142857142857142857142857143%;
    padding-left: 4.285714285714285714285714285714%;
    width: 70%;
    height: 23.345784418356456776947705442903%;
    font-size: 25px;
    padding-bottom: 2.857142857142857142857142857143%;
}

.follow {
    padding-top: 8.571428571428571428571428571429%;
    font-size: 20px;
}

.followObject {
    padding-bottom: 8.571428571428571428571428571429%;
}

.userImg {
    height: 50px;
    width: 50px;
}

</style>