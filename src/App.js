import React, {useEffect, useState} from 'react';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

// Import Froala Editor plugins.
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/table.min';
import 'froala-editor/js/plugins/colors.min';
import 'froala-editor/js/plugins/inline_style.min';
import 'froala-editor/js/plugins/font_size.min';
import 'froala-editor/js/plugins/lists.min';
import { encode, decode } from 'js-base64';

// Include font-awesome css if required.
// install using "npm install font-awesome --save"
import 'font-awesome/css/font-awesome.css';
import 'froala-editor/js/third_party/font_awesome.min.js';
import "./App.css"
import 'html5-device-mockups'
import rehypeSanitize from "rehype-sanitize";

const gh = require('hast-util-sanitize/lib/github')
const rehype = require('rehype');
const merge = require('deepmerge');
const schema = merge(gh, {tagNames: ["u"], attributes: {"*": ["style", "className"]}})


function App() {
  const config = {
    placeholderText: 'Edit Me',
    charCounterCount: false
  };

  const [htmlModel, setHtmlModel] = useState('');
  const [sanitizedHtml, setSanitizedHtml] = useState('');

  const handleModelChange = newModel => {
    setHtmlModel(newModel)
  };

  useEffect(  () => {
    rehype()
      .use(rehypeSanitize, schema)
      .process(String(htmlModel), (err, f) => setSanitizedHtml(String(f)))
  }, [htmlModel])

  const style = {
    border: "2px solid black",
    margin: "auto",
    width: "80%",
    height: "50%",
    position: "relative",
    top: "3em",
  }

  return (
    <div style={{ margin: "2em"}}>
      <div className="Editor">
        <FroalaEditor
          tag='textarea'
          config={config}
          model={htmlModel}
          onModelChange={handleModelChange}
        />
      </div>
      <div style={{margin: 10}}>
        Html:
        <div style={{flex: 0.75}}>
          {htmlModel}
        </div>
      </div>
      <div style={{flex: 1, alignSelf: "center"}}>
        <div className="device-wrapper">
          <div className="device" data-device="iPhone7" data-orientation="portrait" data-color="black">
            <div style={{backgroundColor: "white"}} className={"screen"}>
              <div style={style}>
              <FroalaEditorView style={{backgroundColor: 'whitesmoke'}} model={sanitizedHtml + stylez} />
              </div>
            </div>
            <div className="button">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const stylez = `
  <style>
    html, body {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }
    body {
      display: flex;
      flex-flow: column;
    }
    div {
      position: relative;
      flex: 1
      overflow: auto;
    }
  </style>
`

export default App;
