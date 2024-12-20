import { useEffect, useState } from "react";
import allArticles from "../data/articles";

const initialFormData = {
  image: "",
  title: "",
  content: "",
  category: ["Attualità", "Politica", "Economia", "Scienza", "Sport", "Spettacolo", "Moda"],
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

    // identificare la chiave da cambiare
    const keyToChange = event.target.name;

    // impostare nuovo valore e ricreare oggetto
    let newValue;

    if (event.target.type === "checkbox") {
      newValue = event.target.checked;
    } else {
      newValue = event.target.value;
    };

    const newData = {
      ...formData,
      [keyToChange]: newValue
    };

    // aggiorno l'oggetto 
    setFormData(newData);
  };

  const printCategories = () => {
    return formData.category.map((categ, index) => (
      <div className="catego-list" key={index}>
        <input
          className="check-input"
          type="checkbox" 
          name="checkbox"
          id="artCategory"
          checked={formData.category}
          onChange={handleInputOnChange}
          />
        <label htmlFor="">{categ}</label>        
      </div>
    ));
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
                <div>
                  <label className="text-label" htmlFor="artImage">Immagine</label>
                  <input
                    className="text-input"
                    type="text"
                    placeholder="Incolla il link dell'immagine dell'articolo"
                    name="image"
                    id="artImage"
                    value={formData.image}
                    onChange={handleInputOnChange}
                  />
                </div>

                <div>
                  <label className="text-label" htmlFor="artTitle">Titolo</label>
                  <input
                    className="text-input"
                    type="text"
                    placeholder="Scrivi il titolo dell'articolo"
                    name="title"
                    id="artTitle"
                    value={formData.title}
                    onChange={handleInputOnChange}
                  />
                </div>

                <div>
                  <label className="text-label" htmlFor="artContent">Descrizione</label>
                  <input
                    className="text-input"
                    type="text"
                    placeholder="Scrivi il contenuto dell'articolo"
                    name="content"
                    id="artContent"
                    value={formData.content}
                    onChange={handleInputOnChange}
                  />
                </div>
                
                <div className="categories-box">
                  <label htmlFor="artCategory">Categoria</label>
                  {printCategories()}
                </div>                

                <div>
                  <label htmlFor="">Pubblicato</label>
                  <input
                    className="publish" 
                    type="checkbox"
                    name="published"
                    id="artPublished"
                    value={formData.published}
                    onChange={handleInputOnChange}
                     />           
                </div>

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
                    <ul>
                      {
                        curArticle.category.map((categ, index) => (
                          <li key={index}>{categ}</li>
                        ))
                      }
                    </ul>


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