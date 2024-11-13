<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

let users = ref<Array<User>>([]);
get_user();

const home_error_message = ref<String>('');

async function get_user() {
  console.log('Fetching users');
  try {
    const resp = await fetch('http://localhost:8081/user/batch',
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

const clientId = Number(localStorage.getItem('QuarrelSessionID'));

</script>

<template>
    <div class="full">  
        <div class="searchDiv">
            <input class="search" placeholder="Search" type="text" v-model="searchTerm">
            <button class="searchButton" @click="$router.push('/search/' + searchTerm)">Search</button>
        </div>
        <div class="trendingSuggestions">What's Happening
            <div class="trending">
                <div>Trending
                    <div class="trendingObject">Movies</div>
                </div>
                <div>Trending
                    <div class="trendingObject">Sports</div>
                </div>
                <div>Trending
                    <div class="trendingObject">Games</div>
                </div>
                <div>Trending
                    <div class="trendingObject">Music</div>
                </div>
                <div>Trending
                    <div class="trendingObject">Trends</div>
                </div>
            </div>
        </div>

        <div class="followSuggestions">Who to Follow
            <div class="follow">
                <RouterLink :to="{ name: 'profile', params: { id: u.UID } }" v-for="u in users">
                    <div class="followObject">
                        <span v-if="!(clientId === u.UID)">
                            <span v-if="!u.Profile_pic">
                            <img class="userImg" src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg">
                            </span>
                            <span v-else>
                            <img class="userImg" v-bind:src=u.Profile_pic>
                            </span>
                            <span>{{ '\u00A0\u00A0' + u.Username }}</span>
                        </span>
                    </div>
                </RouterLink>
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
    outline: none;
}

.searchButton {
    position: absolute;
    top: 0%;
    left: 105%;
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
    font-size: 20px;
}

.followObject:hover {
    background-color: violet;
}


.userImg {
    height: 50px;
    width: 50px;
}

</style>