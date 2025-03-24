import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [isMobile] = useMobile();
    
    const params = new URLSearchParams(location.search);
    const searchText = params.get('q') || '';
    
    const [searchValue, setSearchValue] = useState(searchText);

    useEffect(() => {
        setIsSearchPage(location.pathname === "/search");
    }, [location]);

    const redirectToSearchPage = () => {
        const currentQuery = new URLSearchParams(location.search).get('q') || '';
        navigate(`/search?q=${currentQuery}`);
    };

    const handleOnChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        const url = `/search?q=${value}`;
        navigate(url);
    };

    return (
        <div className='w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>
            <div>
                {isMobile && isSearchPage ? (
                    <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md'>
                        <FaArrowLeft size={20}/>
                    </Link>
                ) : (
                    <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
                        <IoSearch size={22}/>
                    </button>
                )}
            </div>
            <div className='w-full h-full'>
                {!isSearchPage ? (
                    <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
                        <TypeAnimation
                            sequence={[
                                'Search "milk"',
                                1000,
                                'Search "bread"',
                                1000,
                                'Search "sugar"',
                                1000,
                                'Search "panner"',
                                1000,
                                'Search "chocolate"',
                                1000,
                                'Search "curd"',
                                1000,
                                'Search "rice"',
                                1000,
                                'Search "egg"',
                                1000,
                                'Search "chips"',
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    <div className='w-full h-full'>
                        <input
                            type='text'
                            placeholder='Search for atta dal and more.'
                            autoFocus
                            value={searchValue} // controlled value
                            className='bg-transparent w-full h-full outline-none'
                            onChange={handleOnChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
