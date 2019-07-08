import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { Default as Card } from "../../card";
import Wrapper from "../../wrapper";
import StopsItem from "./stops-item";
import EditItem from "./edit-item";
import Accordion from "../../accordian";
import AccordionItem from "../../accordian/accordian-item";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import "./style.scss";
import { setEditingStep, deleteStop } from "../../../ducks/actions";

const StopsEditor = () => {
  const { routes, stops, alert, error, editingStepId } = useSelector(state => {
    const { stops, routes, alert, error, editingStepId } = state;
    return {
      stops,
      routes,
      alert,
      error,
      editingStepId
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  const toggleEdit = useCallback(id => {
    dispatch(setEditingStep(id));
  });

  const _onEdit = useCallback(id => {
    dispatch(setEditingStep(id));
  });

  const _onDelete = useCallback(id => {
    dispatch(deleteStop(id));
  });

  const _onCancelEdit = () => {
    dispatch(setEditingStep(null));
  };

  return (
    <Card
      className="stops-editor"
      header={
        <Wrapper styling={{ justifyContent: "flex-end" }}>Routes</Wrapper>
      }
      cardType="default"
    >
      <Accordion className="card-group">
        {routes.map((stopId, index) => {
          return (
            <AccordionItem
              key={"acc" + stopId}
              id={stopId}
              className="route-item"
              title={
                <StopsItem
                  stop={stops[stopId]}
                  index={index}
                  key={"stops-item-" + `${stopId}`}
                  onEdit={toggleEdit}
                  onDelete={_onDelete}
                />
              }
              expanded={editingStepId === stopId}
            >
              <EditItem
                stop={stops[stopId]}
                alert={alert}
                error={error}
                onEdit={_onEdit}
                onDelete={_onDelete}
                onCancel={_onCancelEdit}
                editingStepId={editingStepId}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
};

export default memo(StopsEditor);
