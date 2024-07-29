import React, { useState, useEffect, useRef } from "react";

const COMPONENT_WIDTH = 200;
const COMPONENT_HEIGHT = 50;

const Page = ({
    components,
    onComponentSelect,
    onComponentDeselect,
    setComponents,
    openModal,
}) => {
    const pageRef = useRef(null);
    const [draggingComponent, setDraggingComponent] = useState(null);

    useEffect(() => {
        const savedComponents = JSON.parse(
            localStorage.getItem("pageComponents")
        );
        if (savedComponents) {
            setComponents(savedComponents);
        }
    }, [setComponents]);

    useEffect(() => {
        localStorage.setItem("pageComponents", JSON.stringify(components));
    }, [components]);

    const handleDrop = (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData("id");
        const isNew = e.dataTransfer.getData("isNew") === "true";

        const rect = pageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (isNew) {
            const type = e.dataTransfer.getData("componentType");
            const newComponent = {
                id: Date.now(),
                type,
                x,
                y,
                content: type,
                fontSize: "inherit",
                fontWeight: "normal",
            };
            setComponents((prevComponents) => [
                ...prevComponents,
                newComponent,
            ]);
        } else if (id) {
            const updatedComponents = components.map((component) =>
                component.id === parseInt(id, 10)
                    ? { ...component, x, y }
                    : component
            );
            setComponents(updatedComponents);
        }
        setDraggingComponent(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleComponentClick = (component) => {
        setDraggingComponent(component);
        onComponentSelect(component);
    };

    const handleComponentDeselect = () => {
        setDraggingComponent(null);
        onComponentDeselect();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Delete" && draggingComponent) {
            setComponents((prevComponents) =>
                prevComponents.filter(
                    (comp) => comp.id !== draggingComponent.id
                )
            );
            setDraggingComponent(null);
        }
    };

    return (
        <div
            className="page"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            ref={pageRef}
            onClick={handleComponentDeselect}
            onKeyDown={handleKeyDown}
            tabIndex="0"
        >
            {components.map((component) => (
                <div
                    key={component.id}
                    className={`page-component ${
                        draggingComponent &&
                        draggingComponent.id === component.id
                            ? "selected"
                            : ""
                    }`}
                    style={{
                        left: component.x,
                        top: component.y,
                        position: "absolute",
                        width: COMPONENT_WIDTH,
                        height: COMPONENT_HEIGHT,
                        cursor: "move",
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleComponentClick(component);
                    }}
                    draggable
                    onDragStart={(e) => {
                        e.dataTransfer.setData("id", component.id.toString());
                        e.dataTransfer.setData("isNew", "false");
                    }}
                >
                    {component.type === "input" && (
                        <input
                            type="text"
                            value={component.content}
                            style={{
                                width: "20rem",
                                height: "100%",
                                fontSize: component.fontSize,
                                fontWeight: component.fontWeight,
                            }}
                            readOnly
                        />
                    )}
                    {component.type === "button" && (
                        <button
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "5px",
                                fontSize: component.fontSize,
                                fontWeight: component.fontWeight,
                                backgroundColor: "blue",
                                color: "white",
                            }}
                        >
                            {component.content}
                        </button>
                    )}
                    {component.type === "label" && (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                fontSize: component.fontSize,
                                fontWeight: component.fontWeight,
                            }}
                        >
                            {component.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Page;
