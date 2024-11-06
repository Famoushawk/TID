import React, { useState, useEffect } from "react";
import Parse from 'parse';

function ProfileBar() {
    const [username, setUsername] = useState('Loading...');

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const currentUser = Parse.User.current();
                if (currentUser) {
                    setUsername(currentUser.get('username'));
                } else {
                    setUsername('Guest');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUsername('Error loading user');
            }
        };

        getCurrentUser();
    }, []);

    return (
      <section className="flex gap-2 self-start p-4 bg-primary ml-1">
          <img
          src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59s6qBOFlkS5LN4Z0U3G71nCWWg3SuHGVMw&s"}
          alt={"Profile picture"}
          className={'w-[84px] aspect-[1.05] rounded-full'} />
          <div className="flex flex-col justify-center">
            <span className="font-medium text-lg">{username}</span>
          </div>
      </section>
    );
}
  
export default ProfileBar;