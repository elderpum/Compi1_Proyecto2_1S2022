import "./App.css";
import Button from "@material-ui/core/Button";
import SaveAltRoundedIcon from "@material-ui/icons/SaveAltRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import OpenInBrowserRoundedIcon from "@material-ui/icons/OpenInBrowserRounded";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { makeStyles } from "@material-ui/core/styles";
import Editor from "@monaco-editor/react";
import React, { useRef,useState } from "react";
import {saveAs} from "file-saver"

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [valueEditor,setValueEditor] = useState("");
  const [valor,setValorconsola] = useState("");
  const editorRef = useRef(null);

 const createFile = () =>{
   const blob = new Blob([editorRef.current.getValue()], {type: "text/plain; charset=utf-8"});
   saveAs(blob,"file.cst")
 }
 
 const readFile = (e) =>{
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.onload = () =>{
      console.log("Archivo Cargado exitosamente");
      setValueEditor(fileReader.result);
    }

    fileReader.onerror = ()=>{
      console.log(fileReader.error);
    }
 }

  const newFile = () =>{
    setValueEditor("");
  }
/*
  const printconsola = (imprimir_) =>{
      setValorconsola(imprimir_);
  }
 */

  const handleEditorDidMount = (editor, monaco) =>{
    editorRef.current = editor;
  }

  const compilar = () =>{
    
    const data ={
      "input" : valueEditor
    }

    fetch('http://localhost:3000/compiling',{
      method: 'POST',
      headers:{"Content-Type" : "application/json"},
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data =>{
        var datares = JSON.stringify(data);
        var consoleres = JSON.parse(datares).consola
        setValorconsola(consoleres);
        //console.log('response: ', data);
      });
    
  }



  return (
    <header className="App-header">
      <div>
      
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={newFile}
        >
          Nuevo
        </Button>
        <input
        accept=".cst"             
        style={{display: "none"}}
        id="contained-button-file"
        multiple
        type="file"
        onChange={readFile}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="secondary" component="span"
        startIcon={<OpenInBrowserRoundedIcon />}
        >
          Abrir
        </Button>
      </label>

        

        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<SaveAltRoundedIcon />}
          onClick = {createFile}
        >
          Guardar
        </Button>
      </div>
      <div className="editores">
        <div className="espacio"></div>

        <div style={{ width: "50%" }}>
          <Editor
            className="texteditor"
            height="400px"
            theme="vs-dark"
            defaultLanguage="typescript"
            value = {valueEditor}
            onMount={handleEditorDidMount}
          />
        </div>
        <div className="espacio"></div>
        <div style={{ width: "50%" }}>
          <textarea className="consola" type="textare" 
          name="textValue"
          readOnly="readOnly"
          value = {valor}
          wrap="hard"></textarea>
        </div>
      </div>
      <div className="espacio"></div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<PlayArrowIcon />}
        onClick ={compilar}
      >Ejecutar</Button>
    </header>
  );
}

export default App;
