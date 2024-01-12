import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerDocs = () => {
  return (
    <div>
      <SwaggerUI url="/userRegAPI.yaml"/>
      <SwaggerUI url="/urlAPI.yaml" />
    </div>
  );
};

export default SwaggerDocs;
