import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context/context'
import Gif from '../Components/gif'
import { HiMiniChevronUp,HiMiniChevronDown } from 'react-icons/hi2'

const contentType = ["gifs","stickers","texts"]

const SingleGif = () => {
  const {type,slug} = useParams()
  const [gif,setGif] = useState({})
  const [relatedGifs,setRelatedGifs] = useState()
  const [readMore,setReadMore] = useState(false)

  const {gf} = GifState()
  
  const fetchGif = async () => {
    const gifId = slug.split("-")
    const {data} = await gf.gif(gifId[gifId.length-1])
    const {data1} = await gf.related(gifId[gifId.length-1],{
      limit:10,
    })
    setGif(data)
    setRelatedGifs(data1)
  }

  useEffect(() => {
    if(!contentType.includes(type)){
      throw new Error("Invalid content type")
    }
    fetchGif()
  },[])

  return (
    <div className='grid grid-cols-4 my-10 gap-4'>
      <div className='hidden sm:block'>
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                { gif?.user?.description.length >100 && (
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                      <>
                        Read less <HiMiniChevronUp size={20} />
                      </>
                    ) : (
                      <>
                        Read more <HiMiniChevronDown size={20} />
                      </>
                  )}
                </div>)}
              </p>
            )}
          </>
        )}
      </div>
      <div className='col-span-4 sm:col-span-3'>
        <div className='flex gap-6'>
          <div className='w-full sm:w-3/4'>
            <div className='faded-text truncate mb-2'>
              {gif.title}
            </div>
            <Gif gif={gif} hover={false}/>
          </div>
          Favourites
        </div>
        <div>
          <span className='font-extrabold'>Related gifs</span>
        </div>
      </div>
    </div>
  )
}

export default SingleGif