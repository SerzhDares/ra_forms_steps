import "../App.css";
import { useState } from "react";
import uuid from "react-uuid";
import List from "./List";


export interface FormInterface {
  item_id?: string,
  date: string,
  dist: string,
}

export default function Form() {

  const [form, setForm] = useState<FormInterface>({
    date: '',
    dist: '',
  })

  const {item_id, date, dist} = form;

  const [list, setList] = useState<Array<FormInterface>>([]);


  const dataChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setForm(prevForm => ({
      ...prevForm, [name]: value
    }))

  }
  
  const dataSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);


    if(!date || !dist) {
      return;
    }

    const sumDists = () => 
      list.map(item => {
        if (item_id && item.item_id === item_id) {
          return form;
        }
        if(item.date === date)  {
          return {...item, dist: String(Number(item.dist) + Number(dist))};
        }

        return item;
      })

    const newList = 
      list.find(({date}) => date === form.date) ? sumDists()
      : [...list, {
          item_id: uuid(),
          date: date,
          dist: dist,
        }];

    setList(newList);
    setForm({
      date: '',
      dist: ''
    })
    console.log(list);
  }

  const itemDelete = (item: FormInterface) => {
    setList(list.filter(({item_id}) => item_id !== item.item_id));
  }

  return (
    <div className="container">
      <form className="form" onSubmit={dataSubmit}>
          <div className="inputClass">
              <label className="label" htmlFor="date">Дата</label>
              <input className="input" type="date" id="date" name="date" value={date} onChange={dataChangeHandler}/>
          </div>
          <div className="inputClass">
              <label className="label" htmlFor="dist">Пройдено км</label>
              <input className="input" type="number" id="dist" name="dist" value={dist} onChange={dataChangeHandler}/>
          </div>
          <button className="button" type="submit">OK</button>
      </form>
      <List list={list} itemDelete={itemDelete}/>
    </div>
  )
}
