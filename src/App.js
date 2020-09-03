import React, {useEffect, useState} from 'react';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/plugins/line_breaker.min.css';

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
import 'froala-editor/js/plugins/font_family.min';
import 'froala-editor/js/plugins/line_breaker.min';
import 'froala-editor/js/plugins/line_height.min';
import 'froala-editor/js/plugins/lists.min';
import 'froala-editor/js/plugins/word_paste.min';
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



export const FONTS = {
  medium: "FoundersGrotesk-Medium",
  bold: "FoundersGrotesk-Bold",
  regular: "FoundersGrotesk-Regular",
  semiBold: "FoundersGrotesk-Semibold",
  superette: "Superette-Medium",
  superetteBold: "Superette-Bold",
  superetteSemiBold: "Superette-Semibold",
};

function App() {
  const COLORS = {
    dark: "black",
    white: "white",
    disclaimerGrey: "#C9C9C9",
    textBoxBackground: "#FBFBFB",
    textBoxBottom: "#ebebeb",
    googleRed: "#C05154",
    facebookBlue: "#4669B3",
    lightgray: '#E9E6E6',
    darkGolfBlue: "#194866",
    profileIcon: "#BFD4FA",
    starRating: '#ebce6c',
    pink: "#FF5BED",
    checkboxGreen: '#47D250',
    checkboxRed: '#EB4B43',
    pickSelectionNavy: "#142649",
    tabBarYellow: "#F6E264",
    neonPink: "#FF5BEE",
    faintPink: "#E4BBDD",
    barelyBlue: "#EEF7F7",
    darkTeal: "#398597",
    lightBlue: "#EEF7F7",
    background: "#FFFBF7",
    teal: "#90F5F7",
    inactiveGray: "#A8A8A8",
    borderGray: "#D3D3D3",
    lightNeonBlue: "#90F5F7",
    tabGrey: "#7D95A3",
  };

  const config = {
    placeholderText: 'Content Goes Here',
    charCounterCount: false,
    colorsStep: 10,
    colorsText: Object.values(COLORS),
    colorsBackground: Object.values(COLORS),
    useClasses: false,
    inlineStyles: {
      'Chirp Pink': `font-family: Superette-Medium; font-size: 20pt; color: #FF5BED;`
    },
    fontFamily: {
      "Superette-Medium": "Superette"
    },
    fontFamilySelection: true,
    fontSize: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '24', '30', '36', '48', '60', '72', '96'],
    fontSizeUnit: 'px'
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

  const displayBoxStyle = {
    border: "2px solid black",
    margin: "auto",
    padding: "2px",
    overscrollBehavior: "contain",
    width: "95%",
    height: "32%",
    position: "relative",
    top: "3em",
  }
  const header = `<head><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, width=device-width"></head>`

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
          {sanitizedHtml}
        </div>
      </div>
      {/*<div style={{flex: 1, alignSelf: "center"}}>*/}
      {/*  <div className="device-wrapper">*/}
      {/*    <div className="device" data-device="iPhone7" data-orientation="portrait" data-color="black">*/}
      {/*      <div style={{backgroundColor: "white"}} className={"screen"}>*/}
      {/*        <div style={displayBoxStyle}>*/}
      {/*          <FroalaEditorView model={header + htmlModel} />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
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

