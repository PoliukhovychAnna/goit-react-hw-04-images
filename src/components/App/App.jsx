import {  React, useEffect, useRef, useState } from 'react';
import { WrapperApp } from './Styled.App';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { getPictures } from 'services/api';
import { Button } from '../Button/Button';
import { Message } from 'components/Loader/Styled.loader';
import { Loader } from 'components/Loader/Loader';

export const App = () => {
  const abortCtrl = useRef();
  const per_page = 12

  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [pictures, setPictures] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isShowButton, setIsShowButton] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)
  
  useEffect(() => {
    if (searchValue === '') {
      return
    }
    const searchPictures = async (query, currentPage) => {
       
       if (abortCtrl.current) {
         abortCtrl.current.abort();
       }
       abortCtrl.current = new AbortController();

       setIsLoading(true);

       try {
         const { total, hits } = await getPictures(
           query,
           currentPage,
           abortCtrl.signal
         );

         if (!total) {
           setIsEmpty(true);
           return;
         }

         setPictures(prevState => [...prevState, ...hits]);
         setIsShowButton(currentPage < Math.ceil(total / per_page));
         setIsEmpty(false);
       } catch (error) {
         if (error.code !== 'ERR_CANCELED') {
           setError(error.message);
         }
       } finally {
         setIsLoading(false);
      }
      
    };
    
    searchPictures(searchValue, page);
     if (page !== 1) {
      window.scrollBy({
        top: 300 * 2,
        behavior: 'smooth',
      });
    }
  }, [searchValue, page, pictures])
  

 const handleSearch = value => {
    if (searchValue === value) {
      return;
    }
      setSearchValue(value)
      setPage(1)
      setPictures([])
      setIsShowButton(false)
      setIsEmpty(false)
      setError(null)
  };

 

  
    return (
      <WrapperApp>
        <Searchbar onSubmit={handleSearch} />
        {isEmpty && <Message>There are no pictures here!</Message>}
        {isLoading && <Loader />}
        {pictures && <ImageGallery pictures={pictures} />}
        {isShowButton && (
          <Button onClick={() => setPage(prevState => prevState + 1)} />
        )}
        {error && <Message>{error}</Message>}
      </WrapperApp>
    );
  }


// export class App extends Component {
//   abortCtrl;

//   state = {
//     page: 1,
//     searchValue: '',
//     pictures: [],
//     isLoading: false,
//     error: null,
//     isShowButton: false,
//     isEmpty: false,
//     per_page: 12,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { searchValue, page, pictures } = this.state;
//     if (prevState.searchValue !== searchValue || prevState.page !== page) {
//       this.searchPictures(searchValue, page);
//     } 
//       if (prevState.pictures !== pictures && page !== 1) {
//         window.scrollBy({
//           top: 300 * 2,
//           behavior: 'smooth',
//         });
//       }
//   }

//   handleSearch = value => {
//      if (this.state.searchValue === value) {
//        return;
//      }
//     this.setState({
//       searchValue: value,
//       page: 1,
//       pictures: [],
//       isShowButton: false,
//       isEmpty: false,
//       error:null,
//     });
//   };

//   searchPictures = async (query, currentPage) => {
//     if (this.abortCtrl) {
//       this.abortCtrl.abort();
//     }

//     this.abortCtrl = new AbortController(); 

//     this.setState({ isLoading: true });

//     try {
//       const { total, hits } = await getPictures(
//         query,
//         currentPage,
//         this.abortCtrl.signal
//       );

//       if (!total) {
//         this.setState({ isEmpty: true });
//         return;
//       }

//       this.setState(prevState => ({
//         pictures: [...prevState.pictures, ...hits],
//         isShowButton: currentPage < Math.ceil(total / this.state.per_page),
//         isEmpty: false,
//       }));
//     } catch (error) {
//       if (error.code !== 'ERR_CANCELED') {
//         this.setState({ error: error.message })
//       }
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   handleClickBtn = () => {
//     this.setState(prev => ({
//       page: prev.page + 1,
//     }))
//   };

//   render() {
//     const { pictures, isLoading, isEmpty, isShowButton, error } = this.state;
//     return (
//       <WrapperApp>
//         <Searchbar onSubmit={this.handleSearch} />
//         {isEmpty && <Message>There are no pictures here!</Message>}
//         {isLoading && <Loader/>}
//         {pictures && <ImageGallery pictures={pictures} />}
//         {isShowButton && <Button onClick={this.handleClickBtn} />}
//         {error && <Message>{error}</Message> }
//       </WrapperApp>
//     );
//   }
// }
