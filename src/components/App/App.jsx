import { React, useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  
  useEffect(() => {
    if (page !== 1) {
      window.scrollBy({
        top: 300 * 2,
        behavior: 'smooth',
      });
    }
}, [pictures,page])

  useEffect(() => {
    if (searchValue === '') {
      return
    }
    const searchPictures = async (query, currentPage) => {
       if (abortCtrl.current) {
         abortCtrl.current.abort();
       }
       abortCtrl.current = new AbortController();

      try {
        setIsLoading(true);
        setError(null)
         const { total, hits } = await getPictures(
           query,
           currentPage,
           abortCtrl.current.signal
        );
        if (hits.length === 0) {
          return toast.error('Sorry, there are no images for your request...');
        } else if (currentPage === 1) {
          return toast.success('Wow! We found some images for you!');
        } 

         setPictures(prevState => [...prevState, ...hits]);
         setIsShowButton(currentPage < Math.ceil(total / per_page));
         }
        catch (error) {
         if (error.code !== 'ERR_CANCELED') {
           setError(error.message);
         }
       } finally {
        setIsLoading(false);
      }
    };
    searchPictures(searchValue, page);
  }, [searchValue, page])
  

 const handleSearch = value => {
    if (searchValue === value) {
      return;
    }
      setSearchValue(value)
      setPage(1)
      setPictures([])
      setIsShowButton(false)
      setError(null)
  };

    return (
      <WrapperApp>
        <Searchbar onSubmit={handleSearch} />
        {isLoading && <Loader />}
        {pictures && <ImageGallery pictures={pictures} />}
        {isShowButton && (
          <Button onClick={() => setPage(prevState => prevState + 1)} />
        )}
        {error && <Message>{error}</Message>}
        <ToastContainer/>
      </WrapperApp>
    );
  }
