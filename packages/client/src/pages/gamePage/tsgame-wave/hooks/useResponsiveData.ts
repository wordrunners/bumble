import { useCallback, useEffect, useState } from 'react'

const useResponsiveData = () => {


  // const [word, setWord] = useState<any>()

  // // const setData = useCallback(() => {
  // //   setWord(0)
  // // }, [setWord])


  // useEffect(() => {
  //   // const word = '';
  //   // localStorage.setWord('word', JSON.stringify(word));
  //   if (word) {
  //     setWord(word);
  //    }
  // }, [])


  const [items, setItems] = useState();

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('items'));
  //   if (items) {
  //    setItems(items);
  //   }
  // }, []);

  return { items, setItems }
}





export default useResponsiveData
