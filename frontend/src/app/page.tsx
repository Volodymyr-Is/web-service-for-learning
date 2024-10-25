"use client"
import { useEffect, useState } from "react";

export default function Home() {
	const [responseMessage, setResponseMessage] = useState("");

	useEffect(() => {
		console.log("Fetching...");
		fetch('http://localhost:5000/api/hello')
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				console.log(data);
				setResponseMessage(data.message);
			})
			.catch(error => {
				console.error(error);
				setResponseMessage("Failed to fetch data.");
			});
	}, []);

	return (
		<div className="wrapper">
			<p id="response">{responseMessage}</p>
		</div>
	);
}
