Vue.use(vFlagIcons);
new Vue({
    el: "#app",
    data: {
        textToSearch: "ritorno al futuro",
        tmdbApiKey: "06638f66f1ef819d29fa1ce03c883c04",
        moviesList: [],
        tvSeriesList: [],
        mergedList: [],
        urlImg: "https://image.tmdb.org/t/p/w154"
    },
    methods: {
        makeAxiosSearch(searchType) {
            axios.get("https://api.themoviedb.org/3/search/" + searchType, {
                params: {
                    api_key: this.tmdbApiKey,
                    query: this.textToSearch,
                    language: "it-IT"
                }
            }).then((resp) => {
                if (searchType === "movie") {
                    this.moviesList = resp.data.results;
                } else if (searchType === "tv") {
                    /*
                    So che le serie tv, al contrario dei movies, hanno il campo name e original_name al posto di title e original_title sapendo questo posso rinominare queste chiavi per renderle uguali a quelle dei movies?
                    */
                    this.tvSeriesList = resp.data.results.map((tvShow) => {
                        tvShow.original_title = tvShow.original_name;
                        tvShow.title = tvShow.name;
                        return tvShow;
                    });
                }
            });
        },
        voteStar() {
            //in questa funzione voglio passargli la chiave presa dall'api che rappresenta il voto this.vote_avarage e transformarlo in un numero da 1 a 5
            this.mergedList.forEach(element => {
                const vote = this.mergedList.element.vote_avarage
                vote.Math(this.mergedList.element.vote_avarage = vote).ceil
            })
        },
        doSearch() {
            /*
            -dovrà prendere il testo da ricercare
                -this.textToSearch
            -dobbiamo comporrre la query string da utilizzare durante la chiamata Axios (Themoviedb)

            -Eseguo la chiamata all'endPoint che mi serve, inviando la query string appena creata

            -nel then della risposta andrò a salvare i dati che ricevo in una variabile locale
            */
            this.makeAxiosSearch("movie");
            this.makeAxiosSearch("tv");
            this.mergedList = this.moviesList.concat(this.tvSeriesList);
            this.voteStar();
        },
    },
});
