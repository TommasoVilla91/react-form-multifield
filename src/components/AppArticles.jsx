import { useEffect, useState } from "react";
import allArticles from "../data/articles";

const initialFormData = {
  image: "",
  title: "",
  content: "",
  category: [],
  published: false
}

function AppArticles() {

  const [articles, setArticles] = useState(allArticles);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {

  })

  // al click su Submit, aggiornare array creando copia e aggiungendo nuovo articolo
  const handleForm = (event) => {
    event.preventDefault();

    // creo oggetto per nuovo articolo
    const newArticle = {
      ...formData,
      id: Date.now()
    };

    // creo copia array, aggiungendo il nuovo articolo
    const newArray = [...articles, newArticle];

    // aggiorno l'array (vuoto) allArticles
    setArticles(newArray);

    // svuoto i campi del form
    setFormData(initialFormData)
  };

  // al click su Elimina, cancellare articolo stampato
  // badElement = elemento corrente dove ci sarà il pulsante
  const removeElem = (badElement) => {

    // come sopra, creare nuovo array e impostarlo come predefinito
    const newArray = articles.filter((curArticle) => curArticle !== badElement);
    setArticles(newArray);
  };

  const handleInputOnChange = (event) => {
    const keyToChange = event.target.name;

    let newValue;
    const newData = {
      ...formData,
      [keyToChange]: newValue
    };

    setFormData(newData);
  };

  return (
    <>
      <section>
        <div className="container">
          <h2>Lista degli articoli</h2>
          <div>

            {/* riportare sul form con onSubmit la funzione per l'evento Submit */}
            <form action="" className="row" onSubmit={handleForm}>
              <h3>Aggiungi un articolo</h3>
              <div className="row">

                {/* input per aggiungere nuovo articolo con onChange */}
                <label htmlFor="image">Immagine</label>
                <input
                  type="text"
                  placeholder="Incolla il link dell'immagine dell'articolo"
                  name="image"
                  id="artImage"
                  value={formData.image}
                  onChange={handleInputOnChange}
                />
                <label htmlFor="title">Titolo</label>
                <input
                  type="text"
                  placeholder="Scrivi il titolo dell'articolo"
                  name="title"
                  id="artTitle"
                  value={formData.title}
                  onChange={handleInputOnChange}
                />
                <label htmlFor="content">Descrizione</label>
                <input
                  type="text"
                  placeholder="Scrivi il contenuto dell'articolo"
                  name="content"
                  id="artContent"
                  value={formData.content}
                  onChange={handleInputOnChange}
                />

                <div>
                  <button type="submit" className="btn-submit">Aggiungi</button>
                </div>
              </div>
            </form>
          </div>

          <div className="added-articles">
            <h3>Articoli aggiunti</h3>

            {/* stampare articoli */}
            {articles.length > 0 ? (
              <div className="list-articles">
                {articles.map((curArticle) => (
                  <div key={curArticle.id} className="card">
                    <img src={curArticle.image} alt="" />
                    <h4>{curArticle.title}</h4>
                    <p>{curArticle.content}</p>


                    {/* tasto Elimina in cui nell'onClick metto la funzione removeElem */}
                    <button className="bnt-erase" onClick={() => { removeElem(curArticle) }}>Elimina</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Non è presente nessun articolo</p>
            )}
          </div>
        </div>
      </section>
    </>
  )
};

export default AppArticles;