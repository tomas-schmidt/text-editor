import React, { Component } from 'react';
import './FileZone.css';
import axios from 'axios'

class FileZone extends Component {
  state = {
    selectedWord: null,
    input: [
      { data: 'Hello', underlined: false, bold: false, italic: false },
      { data: 'this', underlined: false, bold: false, italic: false },
      { data: 'is', underlined: false, bold: false, italic: false },
      { data: 'a', underlined: false, bold: false, italic: false },
      { data: 'custom', underlined: false, bold: false, italic: false },
      { data: 'text', underlined: false, bold: false, italic: false },
      { data: 'editor', underlined: false, bold: false, italic: false },
    ],
    synonyms: []
  }

  formatWord = action => {
    if (this.state.selectedWord === null) return;
    let newInput = this.state.input;
    newInput[this.state.selectedWord][action] = !newInput[this.state.selectedWord][action];
    this.setState({ input: newInput});
  }

  selectWord = i => {
    this.setState({ selectedWord: i });
    axios.get(`https://api.datamuse.com/words?ml=${this.state.input[i].data}`).then(res =>{
      this.setState({ synonyms: res.data })
    });
  }

  replaceSelectedWord = word => {
    let newInput = this.state.input;
    newInput[this.state.selectedWord].data = word
    this.setState({ input: newInput });
  }

  render() {
    return (
      <div className='file-zone'>
        {this.state.selectedWord !== null ?
          <span className='formating-word'>Formating word: {this.state.input[this.state.selectedWord].data}</span>
          :
          <span className='formating-word'>Double click a word!</span>
        }
        <div className='format-actions'>
          <button className='format-action' onClick={() => this.formatWord('bold')} type='button'><b>B</b></button>
          <button className='format-action' onClick={() => this.formatWord('italic')} type='button'><i>I</i></button>
          <button className='format-action' onClick={() => this.formatWord('underlined')} type='button'><u>U</u></button>
        </div>
        <div className='file'>
          {this.state.input.map((e, i)=>{
            return (
              <div className={`word ${e.underlined ? 'underlined' : ''} ${e.italic ? 'italic' : ''} ${e.bold ? 'bold' : ''}`}
                key={i}
                onDoubleClick={() => this.selectWord(i)}
              >
                <span>{e.data}</span>
              </div>
            )
          })}
        </div>
        <div className='synonyms-container'>
          {this.state.synonyms.map((e, i) => {
            return( 
              <div key={i}>
                <span>{e.word}</span>
                <button onClick={() => this.replaceSelectedWord(e.word)}>Replace!</button>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default FileZone;
