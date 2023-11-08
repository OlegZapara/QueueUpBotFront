import { Fieldset } from 'primereact/fieldset'
import React from 'react'
import './MainPage.css'

export default function MainPage() {
  return (
    <>
      <Fieldset legend={'Про бота:'} className='fieldset'>
      <div>
      <h1 id="about">About</h1>
      <p>Queue Up Now is pretty simple and open-source telegram bot to create different queues you might need during your education in group, group projects, test and more. Simply create new queue using /queue to use default Queue or /queue [alias] to create the Queue with custom name, join it using Inline Keyboard Buttons in order for it to build list, update the info about Queue using Flush or Exit Buttons, and additionally get reminded about your priority, when it comes to the first one. Pretty simple, pretty useful.</p>
      <h1 id="development-stack">Development Stack</h1>
      <p>The project is entirely made using the Java Telegram API Wrapper Library from rubenlagus <a href="https://github.com/rubenlagus/TelegramBots"> TelegramBots</a>, using the Chain of Responsibility pattern which delegates specific updates to different Handlers based on their features and unique content. The general structure also uses the Spring Framework, Spring Boot launcher particulary as out-of-the-box solutions for many possible problems and vulnerabilities in the code. Additionally, the project can be built using Spring Thin-Jar Plugin, so all the dependencies will be downloaded in Runtime, that can also provide us with the minimized jar which contains only Queue logic </p>
      <h1 id="how-to-">How to ... ?</h1>
      <p>In order to successfully set up the application and launch it, you should specify credentials for your Telegram bot retreived via BotFather in Telegram in file named <code>thirdparty.properties</code> located in resources folder</p>
      <pre><code className="lang-properties"><span className="hljs-selector-id">#credentials</span>
      <br></br>
      telegram<span className="hljs-selector-class">.bot</span><span className="hljs-selector-class">.token</span>= <span className="hljs-selector-id">#BOT</span> TOKEN
      <br></br>
      telegram<span className="hljs-selector-class">.bot</span><span className="hljs-selector-class">.username</span>= <span className="hljs-selector-id">#BOT</span> USERNAME
      </code></pre>
      <h1 id="osi">OSI</h1>
      <p>An official online contribution can be found <a href="https://t.me/queueupnow_bot"> here</a>, but you can also always clone this repo and modify the bot as you wish, just make sure to point to this repo as the original idea</p>
      </div>
      </Fieldset>
      <Fieldset legend='Що нового?' className='fieldset'>
        <div>
          Last changes:
          <ul>
            <li>Added timetable feature</li>
            <li>Improved performance</li>
            <li>Fixed bugs</li>
          </ul>
        </div>
      </Fieldset>
    </>
  )
}
