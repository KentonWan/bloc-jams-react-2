import React, {Component} from 'react';
import albumData from './../data/albums';

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
            isHovered: false
        }

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;

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
                                <td>{index+1}</td>
                                <td>{song.title}</td>
                                <td>{song.duration}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </section>
        )
    }
}

export default Album;
