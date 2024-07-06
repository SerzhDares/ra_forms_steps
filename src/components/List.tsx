import { FormInterface } from "./Form";

export interface ListInterface {
    list: FormInterface[],
    itemDelete: (item: FormInterface) => void
}

export default function List({list, itemDelete}: ListInterface) {

  const sortedList = list.sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date),
  );

  const convertDate = ((date: string) => {
    const newDate = date.substring(8,10) + '.' + date.substring(5,7) + '.' + date.substring(0,4);
    return newDate;
})

  return (
    <div className="list">
      {sortedList.map(item => (
        <div className="item" key={item.item_id}>
          <div className="item_text item_date">{convertDate(item.date)}</div>
          <div className="item_text item_dist">{item.dist}</div>
          <button className="del_btn" onClick={() => itemDelete(item)}>✘</button>
        </div>
      ))}
    </div>
  )
}
