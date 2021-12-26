import React, { useState } from 'react';
import ComposeTweetHeader from '../../components/ComposeTweetHeader/ComposeTweetHeader';
import ComposeTweetMain from '../../components/ComposeTweetMain/ComposeTweetMain';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';

const NewTweet = ({ activeUser, handleNewTweet }) => {

    const [tweetText, setTweetText] = useState('');
    const [disabled, setDisabled] = useState(true);

    const handleSetDisabled = (boolean) => {
        setDisabled(boolean)
    }

    const handleSetTweetText = (val) => {
        setTweetText(val);
    }

    return (
        <div className="new-tweet-container">
            <ComposeTweetHeader disabled={disabled} handleNewTweet={handleNewTweet} type={'Tweet'} text={tweetText} />
            <main>
                <DesktopMenu activeUser={activeUser} page="New Tweet" />
                <ComposeTweetMain 
                    text={tweetText} 
                    handleSetDisabled={handleSetDisabled} 
                    handleSetText={handleSetTweetText} 
                    placeholder={"What's happening?"}
                />
            </main>
        </div>
    );
}

export default NewTweet;
