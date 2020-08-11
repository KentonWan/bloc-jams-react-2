import React, {Component} from 'react';

class PlayerBar extends Component {
    render() {
        return (
            <section className="player-bar">
                <section id="buttons">
                    <button id="previous" onClick={this.props.handlePrevClick}>
                    <ion-icon name="play-skip-back-outline"></ion-icon>
                    </button>
                    <button id="play-pause" onClick={this.props.handleSongClick}>
                        <ion-icon name={this.props.isPlaying ? "pause-outline" : "play-outline"}></ion-icon>
                    </button>
                    <button id="next" onClick={this.props.handleNextClick}>
                    <ion-icon name="play-skip-forward-outline" ></ion-icon>
                    </button>
                    </section>
                    <section id="time-control">
                    <div className="current-time">{this.props.currentTime}</div>
                    <input 
                        type="range" 
                        className="seek-bar" 
                        value={(this.props.currentTime/ this.props.duration) || 0}
                        max="1"
                        min="0"
                        step="0.01"
                        onChange={this.props.handleTimeChange}
                    />
                    <div className="total-time">{this.props.duration}</div>
                    </section>
                    <section id="volume-control">
                    <ion-icon name="volume-low-outline"></ion-icon>
                    <input 
                        type="range" 
                        className="seek-bar" 
                        value={this.props.volume}
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={this.props.handleVolumeChange}
                    />
                    <ion-icon name="volume-high-outline"></ion-icon>
                </section>
            </section>
        )
    }
}

export default PlayerBar;