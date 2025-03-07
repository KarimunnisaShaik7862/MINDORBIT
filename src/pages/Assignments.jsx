import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Check } from "lucide-react";
import './Assignments.css';

// Reusable UI Components with Glassmorphic Design
const Card = ({ children, className }) => (
  <div className={`assignment-card ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className, variant = 'default', active = false }) => {
  const variants = {
    default: 'text-white border border-cyan-500/30 hover:bg-cyan-500/20',
    outline: 'border border-cyan-500 text-cyan-500 hover:bg-cyan-500/20',
  };

  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 rounded transition-all duration-300 
        ${variants[variant]} 
        ${active ? 'neon-active' : ''} 
        ${className}`}
    >
      {children}
    </button>
  );
};

const Input = ({ type = 'text', value, onChange, placeholder, className }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`glass-input bg-transparent backdrop-blur-lg border border-cyan-500/50 rounded px-3 py-2 w-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${className}`}
  />
);

const AssignmentsCRUD = () => {
  // State Management
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Assignments on Component Mount
  useEffect(() => {
    fetchAssignments();
  }, []);

  // Fetch Assignments from Mock API
  const fetchAssignments = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      // Transform todo data to assignment structure
      const transformedAssignments = data.slice(0, 10).map(todo => ({
        id: todo.id,
        title: todo.title,
        description: 'Sample description for assignment',
        dueDate: new Date(Date.now() + todo.id * 86400000).toISOString().split('T')[0],
        priority: ['low', 'medium', 'high'][todo.id % 3],
        completed: false
      }));
      setAssignments(transformedAssignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  // Create or Update Assignment
  const handleSaveAssignment = () => {
    const currentAssignment = editingAssignment || newAssignment;
    
    if (!currentAssignment.title || !currentAssignment.dueDate) {
      alert('Please fill in all fields');
      return;
    }

    if (editingAssignment) {
      // Update existing assignment
      const updatedAssignments = assignments.map(assignment => 
        assignment.id === editingAssignment.id 
          ? {...editingAssignment} 
          : assignment
      );
      setAssignments(updatedAssignments);
      setEditingAssignment(null);
    } else {
      // Create new assignment
      const createdAssignment = {
        ...newAssignment,
        id: assignments.length > 0 
          ? Math.max(...assignments.map(a => a.id)) + 1 
          : 1,
        completed: false
      };
      
      setAssignments([...assignments, createdAssignment]);
    }

    // Reset form and close modal
    setNewAssignment({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium'
    });
    setIsModalOpen(false);
  };

  // Toggle Assignment Completion
  const handleToggleCompletion = (assignment) => {
    const updatedAssignments = assignments.map(a => 
      a.id === assignment.id 
        ? { ...a, completed: !a.completed } 
        : a
    );
    setAssignments(updatedAssignments);
  };

  // Delete Assignment
  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter(assignment => assignment.id !== id));
  };

  // Render Assignment Modal - Modified to be centered with transparent background and increased height
  const renderAssignmentModal = () => {
    const currentAssignment = editingAssignment || newAssignment;

    return (
      <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
        <div className="modal-container w-64 bg-transparent backdrop-blur-lg rounded-lg p-5">
          <h2 className="text-lg font-semibold text-white mb-3">
            {editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
          </h2>
          <div className="assignment-form-content">
            <div className="form-field">
              <label className="form-label">Title</label>
              <Input 
                placeholder="Assignment Title" 
                value={currentAssignment.title}
                onChange={(e) => {
                  const updater = editingAssignment ? setEditingAssignment : setNewAssignment;
                  updater(prev => ({
                    ...prev, 
                    title: e.target.value
                  }));
                }}
                className="compact-input"
              />
            </div>
            
            <div className="form-field">
              <label className="form-label">Description</label>
              <Input 
                placeholder="Description" 
                value={currentAssignment.description}
                onChange={(e) => {
                  const updater = editingAssignment ? setEditingAssignment : setNewAssignment;
                  updater(prev => ({
                    ...prev, 
                    description: e.target.value
                  }));
                }}
                className="compact-input"
              />
            </div>
            
            <div className="form-field">
              <label className="form-label">Due Date</label>
              <Input 
                type="date" 
                value={currentAssignment.dueDate}
                onChange={(e) => {
                  const updater = editingAssignment ? setEditingAssignment : setNewAssignment;
                  updater(prev => ({
                    ...prev, 
                    dueDate: e.target.value
                  }));
                }}
                className="compact-input"
              />
            </div>
            
            <div className="form-field dropdown-field">
              <label className="form-label">Priority</label>
              <select 
                value={currentAssignment.priority}
                onChange={(e) => {
                  const updater = editingAssignment ? setEditingAssignment : setNewAssignment;
                  updater(prev => ({
                    ...prev, 
                    priority: e.target.value
                  }));
                }}
                className="glass-input compact-input w-full p-2 rounded-full bg-transparent"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button 
                onClick={handleSaveAssignment}
                className="compact-btn create-btn"
              >
                {editingAssignment ? 'Update' : 'Create'} Assignment
              </button>
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingAssignment(null);
                }}
                className="compact-btn cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Assignment List
  const renderAssignmentList = (assignments) => {
    return assignments.map((assignment) => (
      <div 
        key={assignment.id} 
        className={`assignment-item relative p-4 rounded-lg flex items-center ${assignment.completed ? 'completed' : ''}`}
      >
        <input 
          type="checkbox"
          checked={assignment.completed}
          onChange={() => handleToggleCompletion(assignment)}
          className="assignment-checkbox mr-4"
        />
        <div className="flex-grow">
          <h3 className={`text-white font-bold ${assignment.completed ? 'line-through' : ''}`}>
            {assignment.title}
            {assignment.completed && <Check className="inline-block ml-2 text-neon-cyan" size={18} />}
          </h3>
          <p className={`text-sm text-gray-300 ${assignment.completed ? 'opacity-50' : ''}`}>
            {assignment.description}
          </p>
          <div className="flex space-x-2 mt-2">
            <span className="text-xs px-2 py-1 bg-blue-500/30 text-white rounded">
              Due: {assignment.dueDate}
            </span>
            <span className={`priority-badge text-xs px-2 py-1 rounded text-white ${
              assignment.priority === 'high' ? 'high' : 
              assignment.priority === 'medium' ? 'medium' : 'low'
            }`}>
              {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)} Priority
            </span>
          </div>
        </div>
        <div className="assignment-item-actions">
          {!assignment.completed && (
            <Button 
              variant="outline"
              onClick={() => {
                setEditingAssignment({...assignment});
                setIsModalOpen(true);
              }}
              className="hover:bg-blue-500/20 p-1"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="outline"
            onClick={() => handleDeleteAssignment(assignment.id)}
            className="hover:bg-red-500/20 p-1"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    ));
  };

  // Filtered assignments based on active tab
  const getFilteredAssignments = () => {
    switch(activeTab) {
      case 'All':
        return assignments;
      case 'Pending':
        return assignments.filter(a => !a.completed);
      case 'Completed':
        return assignments.filter(a => a.completed);
      default:
        return assignments;
    }
  };

  return (
    <div className="assignments-container p-6 space-y-6 min-h-screen">
      <div className="assignments-header">
        <div className="header-content">
          <h1 className="text-3xl font-bold text-white mb-4">Assignments</h1>
          <div className="assignments-tabs">
            {['All', 'Pending', 'Completed'].map((tab) => (
              <Button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                active={activeTab === tab}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>
        <Button 
          onClick={() => {
            setNewAssignment({
              title: '',
              description: '',
              dueDate: '',
              priority: 'medium'
            });
            setEditingAssignment(null);
            setIsModalOpen(true);
          }}
          className="add-assignment-btn"
        >
          <Plus className="mr-2" /> Add Assignment
        </Button>
      </div>

      <Card className="p-4">
        <div className="space-y-4">
          {renderAssignmentList(getFilteredAssignments())}
          
          {getFilteredAssignments().length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No assignments found
            </div>
          )}
        </div>
      </Card>

      {/* Edit/Create Assignment Modal */}
      {isModalOpen && renderAssignmentModal()}
    </div>
  );
};

export default AssignmentsCRUD;