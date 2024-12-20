import React from 'react';
import { Navigate } from 'react-router-dom';
import ConstraintTemplateList from '../containers/List/constrainttemplates';
import ConstraintList from '../containers/List/constraints';
import ConstraintTemplateDetails from '../containers/Detail/constrainttemplate';
import ConstraintTemplateTargets from '../containers/Detail/Data/constrainttemplate.targets';
import ConstraintTemplateStatus from '../containers/Detail/Data/constrainttemplate.status';
import ConstraintTemplateConstraints from '../containers/Detail/Data/constrainttemplate.constraints';
import ConstraintViolation from '../containers/Detail/Data/constraint.violation';
import ConstraintsDetails from '../containers/Detail/constraints';

export default [
  {
    parentRoute: '/clusters/:cluster',
    children: [
      {
        path: '/clusters/:cluster/gatekeeper.constrainttemplates',
        element: <ConstraintTemplateList />,
      },
      {
        path: '/clusters/:cluster/gatekeeper.constraints',
        element: <ConstraintList />,
      },
      {
        path: '/clusters/:cluster/gatekeeper.constrainttemplates/:name',
        element: <ConstraintTemplateDetails />,
        children: [
          { index: true, element: <Navigate to="targets" replace /> },
          {
            path: 'targets',
            element: <ConstraintTemplateTargets />,
          },
          {
            path: 'status',
            element: <ConstraintTemplateStatus />,
          },
          {
            path: 'constraints',
            element: <ConstraintTemplateConstraints />,
          },
        ],
      },
      {
        path: '/clusters/:cluster/gatekeeper.constraints/:kind/:name',
        element: <ConstraintsDetails />,
        children: [
          { index: true, element: <Navigate to="violations" replace /> },
          {
            path: 'violations',
            element: <ConstraintViolation />,
          },
        ],
      },
    ],
  },
];
