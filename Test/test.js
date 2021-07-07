<div>
    <% data.forEach(element => { %>
    <h1><%= element.Title %></h1>
    <h1><%= element.isCompleted %></h1>
    <h1><%= element.category %></h1>
    <h1><%= element.createdAt.toDateString()%></h1>
    <h1><%= element.createdBy %></h1>
    <h1>----------------------------------</h1>
    <% }) %>
</div>