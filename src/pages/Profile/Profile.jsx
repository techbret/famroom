import React, {  useState } from "react";
import { useParams } from "react-router-dom";
import ChatRoomBlock from "../../components/ChatRoomBlock/ChatRoomBlock";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ShareSomething from "../../components/ShareSomething/ShareSomething";
import ThoughtLog from "../../components/ThoughtLog/ThoughtLog";

export default function Profile() {
  
  return (
    <div >
      <>    
        {/* Background color split screen for large screens */}
        <div className="relative flex min-h-screen flex-col">
          {/* 3 column wrapper */}
          <div className="mx-auto w-full flex-grow lg:flex xl:px-8 bg-zinc-200">
            {/* Left sidebar & main wrapper */}
            <div className="min-w-0 flex-1 bg-white xl:flex ">
              <div className="border-b border-gray-200 bg-zinc-200 xl:w-96 xl:flex-shrink-0 xl:border-b-0 xl:border-r xl:border-gray-200">
                <div className="h-full py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                  <ProfileCard />
                  {/* End left column area */}
                  <h1>Status Log Goes Here</h1>
                </div>
              </div>

              <div className="bg-gray-50 lg:min-w-0 lg:flex-1">
                <div className="h-full py-6 px-4 sm:px-6 lg:px-8">
                  {/* Start main area*/}
                  <div className="relative h-full" style={{ minHeight: '36rem' }}>                    

                    <ShareSomething />
                    <ThoughtLog />


                  </div>
                  {/* End main area */}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 pr-4 sm:pr-6 lg:flex-shrink-0 lg:border-l lg:border-gray-200 lg:pr-8 xl:pr-0">
              <div className="h-full py-6 pl-6 lg:w-80">
                {/* Start right column area */}
                <ChatRoomBlock />
                {/* End right column area */}
              </div>
            </div>
          </div>
        </div>
      </>

    </div>
  );
}
