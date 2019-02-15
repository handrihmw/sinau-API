function searchMovie (){
    $('#movie-list').html('');
    // $.getJSON('http .....')
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'fa22c909',
            's': $('#search-input').val()
        },
        success: function (result) {
            if( result.Response == "True" ){
                let movies = result.Search;

                $.each(movies, function (i, data){
                    $('#movie-list').append(`
                        <div class="col-md-4">
                            <div class="card md-3">
                                <img class="card-img-top" src="`+ data.Poster +`" alt="Card image cap">
                                <div class="card-body">
                                <h5 class="card-title">`+ data.Title +`</h5>
                                <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `)
                });

                $('#search-input').val('');
            } else {
                $('#movie-list').html(`
                    <div class="col">
                        <h5 class="text-center">`+ result.Error +`</h5>
                    </div>       
                `)
            }
        }
    });
}

$('#search-button').on('click', function () {
    searchMovie();
});

$('#search-input').on('keyup', function (e){
    if (e.keyCode === 13){
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function () {
    //console.log($(this).data('id'));
    $('.modal-body').html('');

    $.ajax({
        type: 'get',
        url: 'http://www.omdbapi.com',
        data: {
            'apikey': 'fa22c909',
            'i': $(this).data('id')
        },
        dataType: 'json',
        success: function (movie) {
            console.log(movie);
            if (movie.Response === 'True') {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` + movie.Poster + `" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class = "list-group" >
                                    <li class = "list-group-item" ><h3> ` + movie.Title + `</h3></li>
                                    <li class = "list-group-item" >Released : ` + movie.Released + `</li> 
                                    <li class = "list-group-item" >Genre : ` + movie.Genre + `</li> 
                                    <li class = "list-group-item" >Director : ` + movie.Director + `</li> 
                                    <li class = "list-group-item" >Actors : ` + movie.Actors + `</li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});