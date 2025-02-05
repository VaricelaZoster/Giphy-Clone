import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context/context'
import FilterGif from '../Components/filter-gif'
import Gif from '../Components/gif'

const Search = () => {
  const [searchResult, setSearchResult] = useState([])
  const { query } = useParams()
  const { gf, filter } = GifState()

  const fetchSearchResult = async () => {
    try {
      const { data } = await gf.search(query, {
        sort: "relevant",
        lang: "en",
        type: filter,
        limit: 20,
      })
      setSearchResult(data)
    } catch (error) {
      console.error("Error fetching search results:", error)
      setSearchResult([])
    }
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      fetchSearchResult()
    }
    return () => {
      isMounted = false
    }
  }, [filter, query]) 

  return (
    <div className='my-4'>
      <h2 className='text-5xl pb-3 font-extrabold'>
        {query.charAt(0).toUpperCase() + query.slice(1)}
      </h2>
      <FilterGif alignLeft={true} />
      {searchResult.length > 0 ? (
        <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2'>
          {searchResult.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      ) : (
        <span>No GIFs were found for {query}. Try searching for something else.</span>
      )}
    </div>
  )
}

export default Search