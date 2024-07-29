import React, { useState, useEffect } from "react";

const Sidebar = ({
    selectedComponent,
    onSave,
    onDelete,
    onClose,
    onExport,
    onComponentDragStart,
}) => {
    const [config, setConfig] = useState({
        fontSize: "",
        fontWeight: "",
        x: "",
        y: "",
        content: "",
    });

    useEffect(() => {
        if (selectedComponent) {
            setConfig({
                fontSize: selectedComponent.fontSize || "inherit",
                fontWeight: selectedComponent.fontWeight || "normal",
                x: selectedComponent.x || "",
                y: selectedComponent.y || "",
                content: selectedComponent.content || "",
            });
        }
    }, [selectedComponent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig((prevConfig) => ({
            ...prevConfig,
            [name]: value,
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (selectedComponent) {
            const updatedComponent = {
                ...selectedComponent,
                fontSize: config.fontSize,
                fontWeight: config.fontWeight,
                x: parseInt(config.x, 10),
                y: parseInt(config.y, 10),
                content: config.content,
            };
            onSave(updatedComponent);
            onClose();
        }
    };

    const handleDelete = () => {
        if (selectedComponent) {
            onDelete(selectedComponent.id);
            onClose();
        }
    };

    const handleDragStart = (e, type) => {
        e.dataTransfer.setData("componentType", type);
        e.dataTransfer.setData("isNew", "true");
    };

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div
                    className="sidebar-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, "label")}
                >
                    Label
                </div>
                <div
                    className="sidebar-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, "input")}
                >
                    Input
                </div>
                <div
                    className="sidebar-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, "button")}
                >
                    Button
                </div>
            </div>

            {selectedComponent && (
                <div className="sidebar-form">
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
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Font Size:</label>
                            <input
                                type="text"
                                name="fontSize"
                                value={config.fontSize}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Font Weight:</label>
                            <input
                                type="text"
                                name="fontWeight"
                                value={config.fontWeight}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>X Coordinate:</label>
                            <input
                                type="number"
                                name="x"
                                value={config.x}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label>Y Coordinate:</label>
                            <input
                                type="number"
                                name="y"
                                value={config.y}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="button-group">
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDelete}
                            >
                                Delete Component
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="sidebar-export">
                <button onClick={onExport} className="btn btn-success">
                    Export Configuration
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
