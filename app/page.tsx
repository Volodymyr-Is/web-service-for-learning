"use client"
import { supabase } from '@/lib/supabaseClient'
import {useEffect} from "react";

export default function Home() {
  const fetchData = async () => {
    let { data, error } = await supabase
        .from('users')
        .select('*')
    if (error) console.log('Error:', error)
    else console.log('Data:', data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return <div>Data fetched from Supabase</div>
}
