import { useState } from "react";
import { Formik,Form,Field } from "formik";
import './App.css'

function App() {
  const[photos,setPhotos]=useState([])
  const open =url =>window.open(url)
  console.log({photos})
  return (
    <div className="App">
      <header className="App-header">
        <Formik
          initialValues={{search:''}}
          onSubmit={async values=>{
            const response=await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers:{
                  'Authorization':'Client-ID mnGoa3D1J45TWmdS7vNCBE9CUUwII0tjEuERjlrbxhg'
                }
              })
              const data=await response.json()
              setPhotos(data.results)
            // console.log(data)
          }}
        >
          <Form>
            <Field name='search' type='text'/>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo=>
            <article key={photo.id} onClick={()=> open(photo.links.html)}>
              <img  src={photo.urls.regular}  alt="alt"/>
              <p>{[photo.description, photo.alt_description].join(' - ')} </p>
            </article>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
