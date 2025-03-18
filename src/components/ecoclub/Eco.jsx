

import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import Logo from "../../assets/images/ecologo.png"; 
import "./Eco.css";
import { FaDownload } from "react-icons/fa";

const EcoClub = () => {
  const [ecoData, setEcoData] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [expandedUpdate, setExpandedUpdate] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:5000/api/eco")
      .then((response) => setEcoData(response.data))
      .catch((error) => console.error("Error fetching data:", error));

    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % (ecoData?.quotes.length || 1));
    }, 5000);

    return () => clearInterval(quoteInterval);
  }, [ecoData]);

  if (!ecoData) return <p>Loading...</p>;

  return (
    <div className="eco-club">
      <div className="eco-header">
        <img src={Logo} alt="Eco Einstein Logo" className="eco-logo" />
        <h2>Eco Einsteins</h2>
      </div>

      <div className="eco-chart">
        <h3>Monthly Waste Collection</h3>
        <Chart
          options={{
            chart: { id: "waste-collection" },
            xaxis: { categories: ecoData.wasteData.months },
          }}
          series={[
            { name: "Big Plastic (kg)", data: ecoData.wasteData.bigPlastic },
            { name: "Small Plastic (kg)", data: ecoData.wasteData.smallPlastic },
            { name: "Other Waste (kg)", data: ecoData.wasteData.otherWaste },
          ]}
          type="bar"
          width="100%"
        />

        
      </div>


      <div className="eco-updates">
        <h3>Recent Activities</h3>
        {ecoData.updates.map((update, index) => (
          <div key={index} className="eco-update">
            <p><strong>{update.title}</strong> - {update.date}</p>
            {expandedUpdate === index ? (
              <>
                <p>{update.details}</p>
                <button onClick={() => setExpandedUpdate(null)} className="see-more-text">Less</button>
              </>
            ) : (
              <button onClick={() => setExpandedUpdate(index)} className="see-more-text">more...</button>
            )}
          </div>
        ))}
      </div>

      <div className="eco-quotes">
        <h3>Eco Thought</h3>
        <p className="animated-quote">{ecoData.quotes[currentQuote]}</p>
      </div>

      <div className="eco-upcoming-events">
        <h3>Upcoming Events</h3>
        {ecoData.events.map((event, index) => (
          <div key={index} className="eco-event">
            <p><strong>{event.name}</strong> - {event.date}</p>
            {expandedEvent === index ? (
              <>
                <p>{event.details}</p>
                <button onClick={() => setExpandedEvent(null)} className="see-more-text">Hide</button>
              </>
            ) : (
              <button onClick={() => setExpandedEvent(index)} className="see-more-text">Details</button>
            )}
          </div>
        ))}
      </div>

      <div className="eco-report">
        <h3>Download Monthly Report</h3>
        <a href="/Report.pdf" download className="download-btn">
          <FaDownload /> Download Now
        </a>
      </div>
    </div>
  );
};

export default EcoClub;



// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// import axios from "axios";
// import Logo from "../../assets/images/ecologo.png"; 
// import "./Eco.css";
// import { FaDownload } from "react-icons/fa";

// const EcoClub = () => {
//   const [ecoData, setEcoData] = useState(null);
//   const [newUpdate, setNewUpdate] = useState({ title: "", date: "", details: "" });
//   const [newEvent, setNewEvent] = useState({ name: "", date: "", details: "" });
//   const [newWasteData, setNewWasteData] = useState({ month: "", bigPlastic: 0, smallPlastic: 0, otherWaste: 0 });

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/eco")
//       .then((response) => setEcoData(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   const handleAddUpdate = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/eco/updates", newUpdate);
//       setEcoData({ ...ecoData, updates: [...ecoData.updates, response.data] });
//       setNewUpdate({ title: "", date: "", details: "" }); 
//     } catch (error) {
//       console.error("Error adding update:", error);
//     }
//   };

//   const handleAddEvent = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/eco/events", newEvent);
//       setEcoData({ ...ecoData, events: [...ecoData.events, response.data] });
//       setNewEvent({ name: "", date: "", details: "" });
//     } catch (error) {
//       console.error("Error adding event:", error);
//     }
//   };

//   const handleAddWasteData = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/eco/waste", newWasteData);
//       setEcoData({
//         ...ecoData,
//         wasteData: {
//           months: [...ecoData.wasteData.months, newWasteData.month],
//           bigPlastic: [...ecoData.wasteData.bigPlastic, parseInt(newWasteData.bigPlastic)],
//           smallPlastic: [...ecoData.wasteData.smallPlastic, parseInt(newWasteData.smallPlastic)],
//           otherWaste: [...ecoData.wasteData.otherWaste, parseInt(newWasteData.otherWaste)],
//         },
//       });
//       setNewWasteData({ month: "", bigPlastic: 0, smallPlastic: 0, otherWaste: 0 });
//     } catch (error) {
//       console.error("Error updating waste data:", error);
//     }
//   };

//   if (!ecoData) return <p>Loading...</p>;

//   return (
//     <div className="eco-club">
//       <div className="eco-header">
//         <img src={Logo} alt="Eco Einstein Logo" className="eco-logo" />
//         <h2>Eco Einsteins</h2>
//       </div>

//       {/* Waste Collection Chart */}
//       <div className="eco-chart">
//         <h3>Monthly Waste Collection</h3>
//         <Chart
//           options={{ chart: { id: "waste-collection" }, xaxis: { categories: ecoData.wasteData.months } }}
//           series={[
//             { name: "Big Plastic (kg)", data: ecoData.wasteData.bigPlastic },
//             { name: "Small Plastic (kg)", data: ecoData.wasteData.smallPlastic },
//             { name: "Other Waste (kg)", data: ecoData.wasteData.otherWaste },
//           ]}
//           type="bar"
//           width="100%"
//         />

//         {/* Add Waste Data */}
//         <div className="eco-form">
//           <input type="text" placeholder="Month" value={newWasteData.month} onChange={(e) => setNewWasteData({ ...newWasteData, month: e.target.value })} />
//           <input type="number" placeholder="Big Plastic (kg)" value={newWasteData.bigPlastic} onChange={(e) => setNewWasteData({ ...newWasteData, bigPlastic: e.target.value })} />
//           <input type="number" placeholder="Small Plastic (kg)" value={newWasteData.smallPlastic} onChange={(e) => setNewWasteData({ ...newWasteData, smallPlastic: e.target.value })} />
//           <input type="number" placeholder="Other Waste (kg)" value={newWasteData.otherWaste} onChange={(e) => setNewWasteData({ ...newWasteData, otherWaste: e.target.value })} />
//           <button onClick={handleAddWasteData}>Add Waste Data</button>
//         </div>
//       </div>

//       {/* Recent Activities */}
//       <div className="eco-updates">
//         <h3>Recent Activities</h3>
//         {ecoData.updates.map((update, index) => (
//           <div key={index} className="eco-update">
//             <p><strong>{update.title}</strong> - {update.date}</p>
//             <p>{update.details}</p>
//           </div>
//         ))}

//         {/* Add Update Form */}
//         <div className="eco-form">
//           <input type="text" placeholder="Title" value={newUpdate.title} onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })} />
//           <input type="date" value={newUpdate.date} onChange={(e) => setNewUpdate({ ...newUpdate, date: e.target.value })} />
//           <textarea placeholder="Details" value={newUpdate.details} onChange={(e) => setNewUpdate({ ...newUpdate, details: e.target.value })}></textarea>
//           <button onClick={handleAddUpdate}>Add Update</button>
//         </div>
//       </div>

//       {/* Upcoming Events */}
//       <div className="eco-upcoming-events">
//         <h3>Upcoming Events</h3>
//         {ecoData.events.map((event, index) => (
//           <div key={index} className="eco-event">
//             <p><strong>{event.name}</strong> - {event.date}</p>
//             <p>{event.details}</p>
//           </div>
//         ))}

//         {/* Add Event Form */}
//         <div className="eco-form">
//           <input type="text" placeholder="Event Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
//           <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
//           <textarea placeholder="Details" value={newEvent.details} onChange={(e) => setNewEvent({ ...newEvent, details: e.target.value })}></textarea>
//           <button onClick={handleAddEvent}>Add Event</button>
//         </div>
//       </div>

//       {/* Download Report */}
//       <div className="eco-report">
//         <h3>Download Monthly Report</h3>
//         <a href="/Report.pdf" download className="download-btn">
//           <FaDownload /> Download Now
//         </a>
//       </div>
//     </div>
//   );
// };

// export default EcoClub;
