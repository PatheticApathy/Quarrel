
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
                <div class="followObject">
                    <img src="../assets/profile-pic.jpg" width = 12.313375404032630444820686470679%> 
                        <span> Bowman</span>
                </div>
                <div class="followObject">
                    <img src="../assets/profile-pic.jpg" width = 12.313375404032630444820686470679%> 
                        <span> Bowman</span>
                </div>
                <div class="followObject">
                    <img src="../assets/profile-pic.jpg" width = 12.313375404032630444820686470679%> 
                        <span> Bowman</span>
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

</style>