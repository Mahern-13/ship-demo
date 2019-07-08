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
import usePrevious from "../../../hooks/usePrevious";

const StopsEditor = () => {
  const { routes, stops, alert, error, editingStepId, edgeCase } = useSelector(
    state => {
      const { stops, routes, alert, error, editingStepId, edgeCase } = state;
      return {
        stops,
        routes,
        alert,
        error,
        editingStepId,
        edgeCase
      };
    },
    shallowEqual
  );
  const dispatch = useDispatch();
  const previousRoutesLength = usePrevious(routes.length);

  useEffect(() => {
    if (previousRoutesLength < routes.length) {
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          left: 0,
          behavior: "smooth"
        });
      }, 350);
    }
  }, [routes.length]);
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
                  editingStepId={editingStepId}
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
                edgeCase={edgeCase}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
};

export default memo(StopsEditor);
