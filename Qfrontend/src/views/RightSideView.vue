
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
                    <img src="../assets/profile-pic.jpg" width = 40 height = 40> 
                        <span> Bowman</span>
                </div>
                <div class="followObject">
                    <img src="../assets/profile-pic.jpg" width = 40 height = 40> 
                        <span> Bowman</span>
                </div>
                <div class="followObject">
                    <img src="../assets/profile-pic.jpg" width = 40 height = 40> 
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
    top: 1rem;
    border-radius: 50px;
    border: 2px solid var(--color-border);
    background-color: mediumpurple;
    border-color: mediumpurple;
    width: 70%;
    height: 40px;
}

.searchDiv:focus-within {
    border-color: violet;
}

.search {
    position: relative;
    top: 5px;
    left: 8.571428571428571428571428571429%;
    background-color: mediumpurple;
    width: 80%;
    height: 20px;
    border: none;
}

.search:focus {
    border: none;
    background-color: mediumpurple;
    outline: none;
}

.trendingSuggestions {
    position: relative;
    left: 2.5rem;
    top: 3rem;
    border-radius: 15px;
    border: 2px solid var(--color-border);
    padding-top: 10px;
    padding-left: 15px;
    width: 350px;
    height: 550px;
    font-size: 25px;
    padding-bottom: 10px;
}

.trendingObject {
    padding-bottom: 30px;
}

.trending {
    padding-top: 30px;
    font-size: 18px;
}

.followSuggestions {
    position: relative;
    left: 2.5rem;
    top: 5rem;
    border-radius: 15px;
    border: 2px solid var(--color-border);
    padding-top: 10px;
    padding-left: 15px;
    width: 350px;
    height: 350px;
    font-size: 25px;
    padding-bottom: 10px;
}

.follow {
    padding-top: 30px;
    font-size: 20px;
}

.followObject {
    padding-bottom: 30px;
}

</style>