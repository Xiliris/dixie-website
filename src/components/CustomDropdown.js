import React, { useState } from "react";
import "./CustomDropdown.scss";

// Lažni podaci o kanalima
const channels = [
  { id: 1, name: "Programiranje" },
  { id: 2, name: "Filmovi" },
  { id: 3, name: "Sport" },
  { id: 4, name: "Vijesti" },
  { id: 5, name: "Muzika" },
  { id: 6, name: "Gaming" },
  { id: 7, name: "Putovanja" },
  { id: 8, name: "Hrana" },
  { id: 9, name: "Moda" },
  { id: 10, name: "Tehnologija" },
];

const CustomDropdown = () => {
  const [selectedChannels, setSelectedChannels] = useState([]);

  const handleChannelSelect = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setSelectedChannels(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedChannelData = selectedChannels.map((channelId) => {
      const channel = channels.find((c) => c.id === channelId);
      return { id: channel.id, name: channel.name };
    });
    console.log("Odabrani kanali:", selectedChannelData);
    setSelectedChannels([]);
    // Obradi slanje forme na server
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const showToolTip = () => {
    setIsToolTipVisible(isToolTipVisible);
  };

  const hideToolTip = () => {
    setIsToolTipVisible(!isToolTipVisible);
  };

  return (
    <div className="custom-dropdown-wrapper">
      <div className="custom-dropdown-selected">
        <h3>Odabrali ste</h3>
        <ul className="selected-channels">
          {selectedChannels.map((channelId) => {
            const channel = channels.find((c) => c.id === channelId);
            return <li key={channelId}>{channel?.name}</li>;
          })}
        </ul>
      </div>

      <div className="custom-dropdown-options">
        <div className="custom-dropdown-header">
          <h3 onClick={toggleDropdown}>Dostupni kanali</h3>
          <icon
            className="fa fa-info-circle"
            onMouseEnter={showToolTip}
            onMouseLeave={hideToolTip}
          >
            {" "}
          </icon>
          {isToolTipVisible && (
            <p>
              <strong>Savjet:</strong>Možete odabrati više kanala tako što ćete
              držati pritisnutu tipku Ctrl ili Cmd na Macu dok klikćete.
            </p>
          )}
        </div>
        {isOpen && (
          <div className="dropdown-options">
            <h4>Odaberite kanale:</h4>
            <select
              multiple
              className="channel-select"
              value={selectedChannels}
              onChange={handleChannelSelect}
            >
              {channels.map((channel) => (
                <option key={channel.id} value={channel.id}>
                  {channel.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="custom-dropdown-footer">
        <button onClick={handleSubmit}>Odaberite</button>
      </div>
    </div>
  );
};

export default CustomDropdown;
