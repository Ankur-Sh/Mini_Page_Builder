import React, { useState, useEffect } from "react";

const Modal = ({ component, onSave, onDelete, onClose }) => {
    const [config, setConfig] = useState({
        fontSize: component.fontSize || "inherit",
        fontWeight: component.fontWeight || "normal",
        x: component.x,
        y: component.y,
        content: component.content || "",
    });

    useEffect(() => {
        setConfig({
            fontSize: component.fontSize || "inherit",
            fontWeight: component.fontWeight || "normal",
            x: component.x,
            y: component.y,
            content: component.content || "",
        });
    }, [component]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig((prevConfig) => ({
            ...prevConfig,
            [name]: value,
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const updatedComponent = {
            ...component,
            fontSize: config.fontSize,
            fontWeight: config.fontWeight,
            x: parseInt(config.x, 10),
            y: parseInt(config.y, 10),
            content: config.content,
        };
        onSave(updatedComponent);
        onClose();
    };

    const handleDelete = () => {
        onDelete(component.id);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Configure Component
                </h2>
                <form onSubmit={handleSave}>
                    <div className="form-group">
                        <label>Content:</label>
                        <input
                            type="text"
                            name="content"
                            value={config.content}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Font Size:</label>
                        <input
                            type="text"
                            name="fontSize"
                            value={config.fontSize}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Font Weight:</label>
                        <input
                            type="text"
                            name="fontWeight"
                            value={config.fontWeight}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>X Position:</label>
                        <input
                            type="number"
                            name="x"
                            value={config.x}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Y Position:</label>
                        <input
                            type="number"
                            name="y"
                            value={config.y}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleDelete}>
                            Delete
                        </button>
                        <button type="button" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
