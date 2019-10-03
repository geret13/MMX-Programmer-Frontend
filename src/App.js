import React, { Component } from 'react';
import axios from 'axios';
import { config } from './config';
import ProgrammingWheel from './ProgrammingWheel';
import { Midi } from "@tonejs/midi";

export default class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedFile: null,
      result: {
        drums: {
          kick: [[], []],
          snare: [[], []],
          hihat: [[], []],
          cymbal: [[], []]
        },
        bass: {
          E: [[], []],
          A: [[], []],
          D: [
            [
              {
                midi: 68,
                name: 'G#4',
                time: 0
              },
              {
                midi: 68,
                name: 'G#4',
                time: 0.5
              },
              {
                midi: 68,
                name: 'G#4',
                time: 2.5
              }
            ],
            [
              {
                midi: 68,
                name: 'G#4',
                time: 1
              },
              {
                midi: 68,
                name: 'G#4',
                time: 1.5
              },
              {
                midi: 68,
                name: 'G#4',
                time: 2
              },
              {
                midi: 68,
                name: 'G#4',
                time: 3
              }
            ]
          ],
          G: [[], []]
        },
        vibraphone: {
          bars: [[], []]
        }
      }
    };
  }

  onChangeHandler = event => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function () {
      const array = new Uint8Array(this.result);

      const midi = new Midi(array);

      console.log(midi);
    };
    reader.readAsArrayBuffer(file);

  };

  onClickHandler = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function () {
      const array = new Uint8Array(this.result);
      const binaryString = String.fromCharCode.apply(null, array);

      console.log(binaryString);
    };
    reader.readAsArrayBuffer(file);
  };

  render () {
    return (
      <div>
        <form>
          <input type="file" name="file" onChange={this.onChangeHandler}/>
          <button type="button" onClick={this.onClickHandler}>
            Upload
          </button>
        </form>
        <a href={process.env.PUBLIC_URL + '/example.mid'}>Example midi file</a>
        {/* <pre>{JSON.stringify(this.state.result, null, 2)}</pre> */}
        {/*<ProgrammingWheel data={this.state.result} />*/}
      </div>
    );
  }
}
