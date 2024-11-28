import {MongoClient, ObjectId} from 'mongodb';

import MeetupDetails from "@/components/meetups/MeetupDetails";
import Head from "next/head";
import MeetupList from "@/components/meetups/MeetupList";
import {Fragment} from "react";

export default function Index(props){

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name={"description"} content={"Browse a huge list of highly active React"}/>
            </Head>
            <MeetupDetails
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>

    )
}

export async function getStaticPaths(){


    const client = await MongoClient.connect('mongodb+srv://hjcho:MEj5mu_a_9D9Pz@cluster0.7fqby.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    return {
        fallback : 'blocking',
        paths : meetups.map(meetup => ({params : {meetupId : meetup._id.toString()}}))
    }
}

export async function getStaticProps(context){

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://hjcho:MEj5mu_a_9D9Pz@cluster0.7fqby.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetup = await meetupsCollection.findOne({_id : new ObjectId(meetupId)});

    return {
        props : {
            meetupData : {
                id : meetupId,
                image : meetup.data.image,
                title : meetup.data.title,
                address : meetup.data.address,
                description : meetup.data.description
            }
        }
    }
}
