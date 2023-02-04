import Hero from '@/components/home/Hero'
import Head from 'next/head'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from '@/components/common/Card'

import { useGlobalContext } from '@/lib/global-context'
import MyMap from '@/components/common/MyMap'
import Navbar from '@/components/home/Navbar'

export default function Home() {
	const { signIn } = useGlobalContext()
	const [data, setData] = useState([])
	const [type, setType] = useState('restaurants')
	const [lat, setLat] = useState([24.659341, 26.068964])
	const [long, setLong] = useState([50.864017, 51.699535])
	useEffect(() => {
		async function getData() {
			const options = {
				method: 'GET',
				url: `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
				params: {
					tr_longitude: long[0],
					tr_latitude: lat[0],
					bl_longitude: long[1],
					bl_latitude: lat[1],
					currency: 'USD',
					lunit: 'km',
					lang: 'en_US',
				},
				headers: {
					'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
					'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_HOST,
				},
			}
			const response = await axios.request(options)
			console.log(response)
			setData(response.data.data)
		}
		// getData()
	}, [type, lat, long])
	return (
		<div>
			<Head>
				<title>TripTips</title>
				<meta name='description' content='Generated by create next app' />
				<link rel='icon' href='/logo.ico' />
			</Head>
			{/* <button onClick={signIn}>Sign in </button>
			<MyMap />
			{data?.length > 0 &&
				data.map((item, index) => (
					<div key={index}>
						<Card
							name={item?.name}
							ranking={item?.ranking}
							type={type}
							photo={item?.photo?.images?.medium?.url}
							rating={item?.rating}
							num_reviews={item?.num_reviews}
							is_closed={item?.is_closed}
							phone={item?.phone}
							address={item?.address}
							website={item?.website}
							web_url={item?.web_url}
							description={item?.description}
						/>
					</div>
				))} */}
			{/* <Navbar />
			<Navbar color='black' /> */}
		</div>
	)
}
