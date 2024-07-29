import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Page from "./Components/Page";
import Modal from "./Components/Modal";

function App() {
    const [components, setComponents] = useState([]);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (updatedComponent) => {
        setComponents((prevComponents) =>
            prevComponents.map((comp) =>
                comp.id === updatedComponent.id ? updatedComponent : comp
            )
        );
        setSelectedComponent(null);
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        setComponents((prevComponents) =>
            prevComponents.filter((comp) => comp.id !== id)
        );
        setSelectedComponent(null);
        setIsModalOpen(false);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedComponent(null);
    };

    const handleComponentSelect = (component) => {
        setSelectedComponent(component);
    };

    const handleComponentDeselect = () => {
        setSelectedComponent(null);
    };

    const openModal = (component) => {
        setSelectedComponent(component);
        setIsModalOpen(true);
    };

    const exportConfiguration = () => {
        const data = JSON.stringify(components, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "page-config.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="app">
            <Sidebar
                selectedComponent={selectedComponent}
                onSave={handleSave}
                onDelete={handleDelete}
                onClose={handleClose}
                onExport={exportConfiguration}
            />
            <Page
                components={components}
                onComponentSelect={handleComponentSelect}
                onComponentDeselect={handleComponentDeselect}
                setComponents={setComponents}
                openModal={openModal}
            />
            {isModalOpen && (
                <Modal
                    component={selectedComponent}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}

export default App;
