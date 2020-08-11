import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props){
        super(props);

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        })

        this.state = {

            album: album,
            currentSong: album.songs[0],
            isPlaying: false,
            isHovered: false, 
            currentTime: 0,
            duration: album.songs[0].duration,
            volume: 0.5
        }

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;

    }

    componentDidMount(){
       this.eventListeners = {
           timeupdate: e => {
               this.setState({currentTime: this.audioElement.currentTime})
           },
           durationchange: e => {
               this.setState({duration: this.audioElement.duration})
           }, 
           volumecontrol: e => {
               this.setState({volume: this.audioElement.volume})
           }
       };
       this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
       this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
       this.audioElement.addEventListener('volumecontrol', this.eventListeners.volumecontrol)

    }

    componentWillUnmount(){
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumecontrol', this.eventListeners.volumecontrol)

    }

    play(){
        this.audioElement.play();
        this.setState({isPlaying: true});
    }

    pause(){
        this.audioElement.pause();
        this.setState({isPlaying: false});
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({currentSong: song})

    }

    handleSongClick(song){
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong){
            this.pause()
        } else {
            if (!isSameSong) {
                this.setSong(song);
            }
            this.play()
        }
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
      }

    handleNextClick(){
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song)
        if (currentIndex === this.state.album.songs.length - 1) {
            console.log(currentIndex, this.state.album.songs.length)
            const newSong = this.state.album.songs[0];
            this.setSong(newSong);
            this.play()
        } else {
             const newIndex = currentIndex +1;
             const newSong = this.state.album.songs[newIndex];
             this.setSong(newSong);
             this.play()
        }
        

    }

    handleTimeChange(e){
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({currentTime: newTime});

    }

    handleVolumeChange(e){
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({volume: newVolume})
    }

    formatTime(t){
        const minutes = parseInt(t/60);
        const seconds = parseInt(t - (minutes*60));
        if(isNaN(t)) {
            return "-:--"
        } else {
            return minutes + ":" + (seconds < 10 ? "0"+ seconds : seconds)
        }
    }

    render() {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover}/>
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>  
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>  
                    <tbody>
                        {
                            this.state.album.songs.map( (song,index) =>
                            <tr className="song" key={index} 
                            onClick={() => this.handleSongClick(song)}
                            onMouseEnter = {() => this.setState({isHovered: index + 1})}
                            onMouseLeave = {() => this.setState({isHovered: false})}>
                                <td className="songActions">
                                    <button className="songNumber">
                                    {
                                        (this.state.currentSong == song && this.state.isPlaying) ? <ion-icon name={this.state.isPlaying ? "pause-outline": "play-outine"}></ion-icon>
                                        :
                                        (this.state.isHovered == index+1) ? <ion-icon name="play-outline"></ion-icon> : <span name="songNumber">{index+1}</span>
                                    }
                                    </button>
                                </td>
                                <td>{song.title}</td>
                                <td>{this.formatTime(song.duration)}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
                <PlayerBar 
                    isPlaying={this.state.isPlaying} 
                    currentSong={this.state.currentSong}
                    currentTime={this.audioElement.currentTime}
                    duration={this.audioElement.duration}
                    volume={this.state.volume}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                    handleVolumeChange={(e) => this.handleVolumeChange(e)}
                    formatTime={(t)=> this.formatTime(t)}
                />
            </section>
        )
    }
}

export default Album;
