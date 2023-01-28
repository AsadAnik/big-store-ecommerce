import React from 'react';
import "./Sidebar.css";
import Logo from '../../../assets/menu.png';
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@mui/lab';
import {
  ExpandMore as ExpandMoreIcon,
  PostAdd as PostAddIcon,
  Add as AddIcon,
  ImportExport as ImportExportIcon,
  ListAlt as ListAltIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  RateReview as RateReviewIcon,
} from '@mui/icons-material';


export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={Logo} alt="Ecommerce" /> <span className="siteName">Big Store</span>
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  )
}
