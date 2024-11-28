import MeetupList from "@/components/meetups/MeetupList";
import {MongoClient} from 'mongodb';
import Head from 'next/head';
import {Fragment} from "react";

export default function Index(props){

    return <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta name={"description"} content={"Browse a huge list of highly active React"}/>
        </Head>
        <MeetupList meetups={props.meetups}/>
    </Fragment>
}

export async function getStaticProps(){

    const client = await MongoClient.connect('mongodb+srv://hjcho:MEj5mu_a_9D9Pz@cluster0.7fqby.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    return {
        props : {
            meetups : meetups.map(meetup => ({
                title : meetup.data.title,
                address : meetup.data.address,
                image : meetup.data.image,
                id : meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}
