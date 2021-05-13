new Vue({
    el: "#app",
    data: {
        textToSearch: "ritorno al futuro",
        tmdbApiKey: "06638f66f1ef819d29fa1ce03c883c04",
        moviesList: [],
        tvSeriesList: [],
        mergedList:[],
    },
    methods: {
        makeAxiosSearch(searchType){
            axios.get("https://api.themoviedb.org/3/search/" + searchType, {
                params: {
                    api_key: this.tmdbApiKey,
                    query: this.textToSearch,
                    language: "it-IT"
                }
            }).then((resp) =>{
                if(searchType === "movie"){
                    this.moviesList = resp.data.results
                } else if (searchType === "tv") {
                    /*
                    So che le serie tv, al contrario dei movies, hanno il campo name e original_name al posto di title e original_title sapendo questo posso rinominare queste chiavi per renderle uguali a quelle dei movies?
                    */
                    this.tvSeriesList = resp.data.results.map((tvShow) => {
                        tvShow.original_title = tvShow.original_name
                        tvShow.title = tvShow.name
                        return tvShow
                    });
                }
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
            this.makeAxiosSearch("movie")
            this.makeAxiosSearch("tv")
            this.mergedList = this.moviesList.concat(this.tvSeriesList)
        }
    },
})
