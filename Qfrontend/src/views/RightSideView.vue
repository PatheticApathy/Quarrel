
<template>
    <div class="full">
        <div class="trendingSuggestions">What's Happening
            <div class="trending">
                <div>Trending
                    <div class="trending1">Thing</div>
                </div>
                <div>Trending</div>
            </div>
        </div>
    </div>
</template>

<style>

.full {
    height: 100%;
    width: 300px;
    position: absolute;
    left: 63rem;
    top: 0rem;
    border-left: 1px solid var(--color-border);
}

.trendingSuggestions {
    position: relative;
    left: 2.5rem;
    top: 12rem;
    border-radius: 15px;
    border: 2px solid var(--color-border);
    padding-top: 10px;
    padding-left: 15px;
    width: 350px;
    height: 550px;
    font-size: 25px;
    padding-bottom: 10px;
}

.trending1 {
    padding-bottom: 20px;
}

.trending {
    padding-top: 10px;
    font-size: 18px;
}

</style>