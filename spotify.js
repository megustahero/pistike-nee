document.addEventListener("DOMContentLoaded", () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('date').setAttribute('max', currentYear);
});

function addSong() {
    const title = document.getElementById('title').value;
    const band = document.getElementById('band').value;
    const genre = document.getElementById('genre').value;
    const date = document.getElementById('date').value;

    if (!title || !band || !genre || !date) {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    const currentYear = new Date().getFullYear();
    if (parseInt(date) > currentYear || parseInt(date) < 1900) {
        alert(`A kiadás éve nem lehet nagyobb, mint ${currentYear}, és nem lehet kisebb, mint 1900.`);
        return;
    }

    const songData = { title, band, genre, date };

    let songs = JSON.parse(localStorage.getItem('songs')) || [];
    songs.push(songData);
    localStorage.setItem('songs', JSON.stringify(songs));

    //displaySongs();

    //document.getElementById('songForm').reset();
    location.href = 'spotify.html';
}

function displaySongs() {
    const songList = document.getElementById('songs');
    const noSongsMessage = document.getElementById('noSongsMessage');

    const songs = JSON.parse(localStorage.getItem('songs')) || [];

    songList.innerHTML = '';

    if (songs.length === 0) {
        noSongsMessage.style.display = 'block';
    } else {
        noSongsMessage.style.display = 'none';

        songs.forEach((song, index) => {
            const songItem = document.createElement('li');
            songItem.textContent = `Cím: ${song.title}, Előadó: ${song.band}, Műfaj: ${song.genre}, Kiadás éve: ${song.date}`;
            songList.appendChild(songItem);
        });
    }
}

// Load songs on page load
window.onload = displaySongs;
