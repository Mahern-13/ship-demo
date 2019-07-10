import React, { memo, useCallback, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { deleteStop, setEditingStep } from "../../../ducks/actions";
import usePrevious from "../../../hooks/usePrevious";
import Accordion from "../../accordian";
import AccordionItem from "../../accordian/accordian-item";
import { Default as Card } from "../../card";
import Wrapper from "../../wrapper";
import EditItem from "./edit-item";
import StopsItem from "./stops-item";

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
      {!routes.length && (
        <Wrapper styling={{ justifyContent: "center" }}>
          Please add routes
        </Wrapper>
      )}
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
              />
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
};

export default memo(StopsEditor);
